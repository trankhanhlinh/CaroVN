import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Board from './board';
import Header from './header';
import { gameSquaresSize } from '../minimax/gameSquares';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.gameMode = localStorage.getItem('mode');
    if (this.gameMode === 'friend') {
      this.socket = io('https://restfulapi-passport-jwt.herokuapp.com');
    }
  }

  componentDidMount() {
    const { handleSelectGameMode, reset } = this.props;
    reset();
    handleSelectGameMode(this.gameMode);
    if (this.gameMode === 'friend') {
      this.socket.connect();
      const { updateSquareSymbol, updateYourTurn, handleClick } = this.props;
      // Set up the initial state when the game begins
      this.socket.on('game.begin', data => {
        console.log('game begin');
        // The server will asign X or O to the player
        updateSquareSymbol(data.symbol);
        // Give X the first turn
        updateYourTurn(data.symbol === 'X');
        document.getElementById('status').innerHTML =
          data.symbol === 'X' ? 'Your turn' : "Your opponent's turn";
      });
      // Event is called when either player makes a move
      this.socket.on('move.made', data => {
        document.getElementById('status').innerHTML =
          data.symbol === 'X' ? 'Your turn' : "Your opponent's turn";
        handleClick(data);
      });
      // Disable the board if the opponent leaves
      this.socket.on('opponent.left', () => {
        document.getElementById('status').innerHTML =
          'Your opponent left the game.';
      });
    }
  }

  componentWillUnmount() {
    if (this.gameMode === 'friend') {
      this.socket.disconnect();
    }
  }

  render() {
    const {
      history,
      stepNumber,
      xIsNext,
      symbol,
      sortAsc,
      currentUser,
      handleClick,
      jumpTo,
      calculateWinner,
      isGameDraw,
      sort,
      handleLogout
    } = this.props;
    // if (gameMode.mode === 'friend') {
    //   // Set up the initial state when the game begins
    //   socket.on('game.begin', data => {
    //     // The server will asign X or O to the player
    //     updateSquareSymbol(data.symbol);
    //     // Give X the first turn
    //     updateYourTurn(data.symbol === 'X');
    //     document
    //       .getElementsByClassName('status')
    //       .text(
    //         `${data.symbol === 'X' ? 'Your turn' : "Your opponent's turn"}`
    //       );
    //   });
    //   // Event is called when either player makes a move
    //   socket.on('move.made', data => {
    //     handleClick(data);
    //   });
    //   // Disable the board if the opponent leaves
    //   socket.on('opponent.left', () => {
    //     document
    //       .getElementsByClassName('status')
    //       .text('Your opponent left the game.');
    //   });
    // }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares, current.pos);
    const isDraw = isGameDraw(current.squares);
    // const jumpToStep = (e, moveNumber) => {
    //   if (!gameMode.isLocked) {
    //     jumpTo(e, moveNumber);
    //     if (moveNumber % 2 !== 0 && gameMode.mode === 'computer') {
    //       computerMove();
    //     }
    //   }
    // };
    const handleClickSquare = position => {
      if (this.gameMode === 'friend') {
        if (
          current.squares[position] ||
          isGameDraw(current.squares) ||
          !xIsNext
        ) {
          return;
        }

        // check previous step
        if (calculateWinner(current.squares, current.pos)) {
          return;
        }

        // Emit the move to the server
        this.socket.emit('make.move', {
          symbol,
          position
        });
      } else {
        handleClick(position);
      }
    };
    const sortedHistory = sortAsc ? history : history.slice().reverse();
    const moves = sortedHistory.map((step, move) => {
      const replayIndex = sortAsc ? 0 : sortedHistory.length - 1;
      if (move !== replayIndex) {
        const properMove = sortAsc ? move : history.length - 1 - move;
        const desc = `Go to move #${properMove} (${parseInt(
          step.pos / gameSquaresSize,
          10
        )},${step.pos % gameSquaresSize})`;
        return (
          <li key={properMove}>
            <button
              type="button"
              className="step-button"
              onClick={e => jumpTo(e, properMove)}
            >
              {desc}
            </button>
          </li>
        );
      }
      return null;
    });

    let status;
    if (winner) {
      status = `Game over. ${xIsNext ? 'You lost.' : 'You won!'}`;
    } else if (isDraw) {
      status = 'Game is draw';
    } else if (this.gameMode === 'friend') {
      status = 'Waiting for opponent to join...';
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <>
        <Header currentUser={currentUser} handleLogout={handleLogout} />
        <div className="game">
          <div className="game-board">
            <Board
              winningSquares={winner ? winner.winningSquares : []}
              size={gameSquaresSize}
              squares={current.squares}
              onClick={i => handleClickSquare(i)}
            />
          </div>
          <div className="game-info">
            <div
              id="status"
              className="status"
              style={{ color: winner ? 'red' : '#00a3af' }}
            >
              {status}
            </div>
            <button
              type="button"
              className="replay-button"
              onClick={e => jumpTo(e, 0)}
            >
              Replay
            </button>
            {history.length > 2 ? (
              <button
                type="button"
                className="sort-button"
                onClick={() => sort()}
              >
                {sortAsc ? 'descending sort' : 'ascending sort'}
              </button>
            ) : null}
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.arrayOf(PropTypes.string).isRequired,
      pos: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  stepNumber: PropTypes.number.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  calculateWinner: PropTypes.func.isRequired,
  updateYourTurn: PropTypes.func.isRequired,
  updateSquareSymbol: PropTypes.func.isRequired,
  isGameDraw: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string,
    password: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleSelectGameMode: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
  // computerMove: PropTypes.func.isRequired
};

export default Game;
