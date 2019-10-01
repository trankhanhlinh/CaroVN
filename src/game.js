import React from "react";
import "./game.css";
import Board from "./board.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(400).fill(null),
          pos: -1
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      size: 20,
      sortAsc: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const pos = current.pos;
    const size = this.state.size;

    this.resetButtonsDefault();

    if (squares[i]) {
      return;
    }

    // check previous step
    if (this.calculateWinner(squares, pos, size)) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          pos: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  resetButtonsDefault() {
    let activeButtons = document.getElementsByClassName("active");

    if (activeButtons.length > 0) {
      activeButtons[0].classList.remove("active");
    }
  }

  jumpTo(event, step) {
    this.resetButtonsDefault();
    event.target.classList.add("active");

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  sort() {
    this.setState({
      sortAsc: !this.state.sortAsc
    });
  }

  render() {
    const history = this.state.history;
    const size = this.state.size;
    const current = history[this.state.stepNumber];
    const sortAsc = this.state.sortAsc;
    const checkedWinningSquares = this.state.checkedWinningSquares;
    const winner = this.calculateWinner(current.squares, current.pos, size);
    const sortedHistory = sortAsc ? history : history.slice().reverse();
    const moves = sortedHistory.map((step, move) => {
      let replayIndex = sortAsc ? 0 : sortedHistory.length - 1;
      if (move !== replayIndex) {
        const properMove = sortAsc ? move : history.length - 1 - move;
        const desc =
          "Go to move #" +
          properMove +
          " (" +
          parseInt(step.pos / size) +
          "," +
          (step.pos % size) +
          ")";
        return (
          <li key={properMove}>
            <button
              type="button"
              className="step-button"
              onClick={e => this.jumpTo(e, properMove)}
            >
              {desc}
            </button>
          </li>
        );
      }
    });

    let status;
    if (winner) {
      status = "Winner is " + winner.player;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares={winner ? winner.winningSquares : []}
            size={size}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status" style={{ color: winner ? "red" : "#00a3af" }}>
            {status}
          </div>
          <button
            type="button"
            className="replay-button"
            onClick={e => this.jumpTo(e, 0)}
          >
            Replay
          </button>
          {history.length > 2 ? (
            <button
              type="button"
              className="sort-button"
              onClick={() => this.sort()}
            >
              {sortAsc ? "descending sort" : "ascending sort"}
            </button>
          ) : null}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  checkColumn = (squares, curSquareIndex, size) => {
    let count = 1;
    let i = 1;
    let startIndexToWin = curSquareIndex;
    let endIndexToWin = curSquareIndex;

    // check hàng dọc
    while (
      curSquareIndex + i * size < size * size &&
      squares[curSquareIndex + i * size] &&
      squares[curSquareIndex + i * size] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save end index to win
    if (i !== 1) {
      endIndexToWin = curSquareIndex + (i - 1) * size;
    }

    i = 1;
    while (
      curSquareIndex - i * size >= 0 &&
      squares[curSquareIndex - i * size] &&
      squares[curSquareIndex - i * size] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save start index to win
    if (i !== 1) {
      startIndexToWin = curSquareIndex - (i - 1) * size;
    }

    if (count >= 5) {
      if (
        (startIndexToWin - size >= 0 &&
          endIndexToWin + size < size * size &&
          (squares[startIndexToWin - size] === null ||
            squares[endIndexToWin + size] === null)) ||
        (startIndexToWin - size < 0 &&
          endIndexToWin + size < size * size &&
          squares[endIndexToWin + size] === null) ||
        (startIndexToWin - size >= 0 &&
          endIndexToWin + size >= size * size &&
          squares[startIndexToWin - size] === null)
      ) {
        // track winning square
        let winningSquares = [];
        for (let i = 0; i < count; i++) {
          winningSquares.push(startIndexToWin + i * size);
        }

        return {
          player: squares[curSquareIndex],
          winningSquares: winningSquares
        };
      }
    }

    return null;
  };

  checkRow(squares, curSquareIndex, size) {
    let count = 1;
    let i = 1;
    let startIndexToWin = curSquareIndex;
    let endIndexToWin = curSquareIndex;

    // check hàng ngang
    let startIndexCurRow = parseInt(curSquareIndex / size) * size;
    let endIndexCurRow = startIndexCurRow + size - 1;

    while (
      curSquareIndex + i <= endIndexCurRow &&
      squares[curSquareIndex + i] &&
      squares[curSquareIndex + i] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save end index to win
    if (i !== 1) {
      endIndexToWin = curSquareIndex + (i - 1);
    }

    i = 1;
    while (
      curSquareIndex - i >= startIndexCurRow &&
      squares[curSquareIndex - i] &&
      squares[curSquareIndex - i] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save start index to win
    if (i !== 1) {
      startIndexToWin = curSquareIndex - (i - 1);
    }

    if (count >= 5) {
      if (
        (startIndexToWin - 1 >= startIndexCurRow &&
          endIndexToWin + 1 <= endIndexCurRow &&
          (squares[startIndexToWin - 1] === null ||
            squares[endIndexToWin + 1] === null)) ||
        (startIndexToWin - 1 < startIndexCurRow &&
          endIndexToWin + 1 <= endIndexCurRow &&
          squares[endIndexToWin + 1] === null) ||
        (startIndexToWin - 1 >= startIndexCurRow &&
          endIndexToWin + 1 > endIndexCurRow &&
          squares[startIndexToWin - 1] === null)
      ) {
        // track winning square
        let winningSquares = [];
        for (let i = 0; i < count; i++) {
          winningSquares.push(startIndexToWin + i);
        }

        return {
          player: squares[curSquareIndex],
          winningSquares: winningSquares
        };
      }
    }

    return null;
  }

  checkRightDiagonalRow(squares, curSquareIndex, size) {
    let count = 1;
    let i = 1;
    let startIndexToWin = curSquareIndex;
    let endIndexToWin = curSquareIndex;

    // check hàng chéo TB-ĐN
    let startIndexCurDiagonalRow = curSquareIndex;
    while (
      startIndexCurDiagonalRow > size - 1 &&
      startIndexCurDiagonalRow % size != 0
    ) {
      startIndexCurDiagonalRow = startIndexCurDiagonalRow - (size + 1);
    }

    let endIndexCurDiagonalRow = curSquareIndex;
    while (
      endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
      (endIndexCurDiagonalRow + 1) % size != 0
    ) {
      endIndexCurDiagonalRow = endIndexCurDiagonalRow + (size + 1);
    }

    while (
      curSquareIndex + i * (size + 1) <= endIndexCurDiagonalRow &&
      squares[curSquareIndex + i * (size + 1)] &&
      squares[curSquareIndex + i * (size + 1)] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save end index to win
    if (i !== 1) {
      endIndexToWin = curSquareIndex + (i - 1) * (size + 1);
    }
    i = 1;
    while (
      curSquareIndex - i * (size + 1) >= startIndexCurDiagonalRow &&
      squares[curSquareIndex - i * (size + 1)] &&
      squares[curSquareIndex - i * (size + 1)] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save start index to win
    if (i !== 1) {
      startIndexToWin = curSquareIndex - (i - 1) * (size + 1);
    }

    if (count >= 5) {
      if (
        (startIndexToWin - (size + 1) >= startIndexCurDiagonalRow &&
          endIndexToWin + (size + 1) <= endIndexCurDiagonalRow &&
          (squares[startIndexToWin - (size + 1)] === null ||
            squares[endIndexToWin + (size + 1)] === null)) ||
        (startIndexToWin - (size + 1) < startIndexCurDiagonalRow &&
          endIndexToWin + (size + 1) <= endIndexCurDiagonalRow &&
          squares[endIndexToWin + (size + 1)] === null) ||
        (startIndexToWin - (size + 1) >= startIndexCurDiagonalRow &&
          endIndexToWin + (size + 1) > endIndexCurDiagonalRow &&
          squares[startIndexToWin - (size + 1)] === null)
      ) {
        // track winning square
        let winningSquares = [];
        for (let i = 0; i < count; i++) {
          winningSquares.push(startIndexToWin + i * (size + 1));
        }

        return {
          player: squares[curSquareIndex],
          winningSquares: winningSquares
        };
      }
    }

    return null;
  }

  checkLeftDiagonalRow(squares, curSquareIndex, size) {
    let count = 1;
    let i = 1;
    let startIndexToWin = curSquareIndex;
    let endIndexToWin = curSquareIndex;

    // check hàng chéo ĐB-TN
    let startIndexCurDiagonalRow = curSquareIndex;
    while (
      startIndexCurDiagonalRow > size - 1 &&
      (startIndexCurDiagonalRow + 1) % size != 0
    ) {
      startIndexCurDiagonalRow = startIndexCurDiagonalRow - (size - 1);
    }

    let endIndexCurDiagonalRow = curSquareIndex;
    while (
      endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
      endIndexCurDiagonalRow % size != 0
    ) {
      endIndexCurDiagonalRow = endIndexCurDiagonalRow + (size - 1);
    }

    while (
      curSquareIndex + i * (size - 1) <= endIndexCurDiagonalRow &&
      squares[curSquareIndex + i * (size - 1)] &&
      squares[curSquareIndex + i * (size - 1)] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save end index to win
    if (i !== 1) {
      endIndexToWin = curSquareIndex + (i - 1) * (size - 1);
    }

    i = 1;
    while (
      curSquareIndex - i * (size - 1) >= startIndexCurDiagonalRow &&
      squares[curSquareIndex - i * (size - 1)] &&
      squares[curSquareIndex - i * (size - 1)] === squares[curSquareIndex]
    ) {
      count++;
      i++;
    }
    // save start index to win
    if (i !== 1) {
      startIndexToWin = curSquareIndex - (i - 1) * (size - 1);
    }

    if (count >= 5) {
      if (
        (startIndexToWin - (size - 1) >= startIndexCurDiagonalRow &&
          endIndexToWin + (size - 1) <= endIndexCurDiagonalRow &&
          (squares[startIndexToWin - (size - 1)] === null ||
            squares[endIndexToWin + (size - 1)] === null)) ||
        (startIndexToWin - (size - 1) < startIndexCurDiagonalRow &&
          endIndexToWin + (size - 1) <= endIndexCurDiagonalRow &&
          squares[endIndexToWin + (size - 1)] === null) ||
        (startIndexToWin - (size - 1) >= startIndexCurDiagonalRow &&
          endIndexToWin + (size - 1) > endIndexCurDiagonalRow &&
          squares[startIndexToWin - (size - 1)] === null)
      ) {
        // track winning square
        let winningSquares = [];
        for (let i = 0; i < count; i++) {
          winningSquares.push(startIndexToWin + i * (size - 1));
        }

        return {
          player: squares[curSquareIndex],
          winningSquares: winningSquares
        };
      }
    }

    return null;
  }

  calculateWinner(squares, curSquareIndex, size) {
    let result = null;

    result = this.checkColumn(squares, curSquareIndex, size);
    if (result) return result;

    result = this.checkRow(squares, curSquareIndex, size);
    if (result) return result;

    result = this.checkRightDiagonalRow(squares, curSquareIndex, size);
    if (result) return result;

    result = this.checkLeftDiagonalRow(squares, curSquareIndex, size);
    if (result) return result;

    return null;
  }
}

export default Game;
