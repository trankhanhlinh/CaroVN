import { connect } from 'react-redux';
import Game from '../components/game';
import {
  addHistory,
  updateStepNumber,
  updateXIsNext,
  toggleSortAsc
} from '../actions';

const resetButtonsDefault = () => {
  const activeButtons = document.getElementsByClassName('active');

  if (activeButtons.length > 0) {
    activeButtons[0].classList.remove('active');
  }
};

const checkColumn = (squares, curSquareIndex, size) => {
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
    count += 1;
    i += 1;
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
    count += 1;
    i += 1;
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
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * size);
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkRow = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng ngang
  const startIndexCurRow = parseInt(curSquareIndex / size, 10) * size;
  const endIndexCurRow = startIndexCurRow + size - 1;

  while (
    curSquareIndex + i <= endIndexCurRow &&
    squares[curSquareIndex + i] &&
    squares[curSquareIndex + i] === squares[curSquareIndex]
  ) {
    count += 1;
    i += 1;
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
    count += 1;
    i += 1;
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
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j);
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkRightDiagonalRow = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng chéo TB-ĐN
  let startIndexCurDiagonalRow = curSquareIndex;
  while (
    startIndexCurDiagonalRow > size - 1 &&
    startIndexCurDiagonalRow % size !== 0
  ) {
    startIndexCurDiagonalRow -= size + 1;
  }

  let endIndexCurDiagonalRow = curSquareIndex;
  while (
    endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
    (endIndexCurDiagonalRow + 1) % size !== 0
  ) {
    endIndexCurDiagonalRow += size + 1;
  }

  while (
    curSquareIndex + i * (size + 1) <= endIndexCurDiagonalRow &&
    squares[curSquareIndex + i * (size + 1)] &&
    squares[curSquareIndex + i * (size + 1)] === squares[curSquareIndex]
  ) {
    count += 1;
    i += 1;
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
    count += 1;
    i += 1;
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
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size + 1));
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkLeftDiagonalRow = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng chéo ĐB-TN
  let startIndexCurDiagonalRow = curSquareIndex;
  while (
    startIndexCurDiagonalRow > size - 1 &&
    (startIndexCurDiagonalRow + 1) % size !== 0
  ) {
    startIndexCurDiagonalRow -= size - 1;
  }

  let endIndexCurDiagonalRow = curSquareIndex;
  while (
    endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
    endIndexCurDiagonalRow % size !== 0
  ) {
    endIndexCurDiagonalRow += size - 1;
  }

  while (
    curSquareIndex + i * (size - 1) <= endIndexCurDiagonalRow &&
    squares[curSquareIndex + i * (size - 1)] &&
    squares[curSquareIndex + i * (size - 1)] === squares[curSquareIndex]
  ) {
    count += 1;
    i += 1;
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
    count += 1;
    i += 1;
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
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size - 1));
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const calculateGameWinner = (squares, curSquareIndex, size) => {
  let result = null;

  result = checkColumn(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRow(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRightDiagonalRow(squares, curSquareIndex, size);
  if (result) return result;

  result = checkLeftDiagonalRow(squares, curSquareIndex, size);
  if (result) return result;

  return null;
};

const handleClickSquare = (i, stateProps, dispatchProps) => {
  const { history, stepNumber, xIsNext } = stateProps;
  const newHistory = history.slice(0, stepNumber + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();
  const { pos } = current;
  const size = 20;

  resetButtonsDefault();

  if (squares[i]) {
    return;
  }

  // check previous step
  if (calculateGameWinner(squares, pos, size)) {
    return;
  }

  squares[i] = xIsNext ? 'X' : 'O';

  dispatchProps.addHistory(newHistory, squares, i);
  dispatchProps.updateStepNumber(newHistory.length);
  dispatchProps.updateXIsNext(!xIsNext);
};

const jumpToStep = (event, step, dispatchProps) => {
  resetButtonsDefault();
  event.target.classList.add('active');

  dispatchProps.updateStepNumber(step);
  dispatchProps.updateXIsNext(step % 2 === 0);
};

const sorting = (stateProps, dispatchProps) => {
  const { sortAsc } = stateProps;

  dispatchProps.toggleSortAsc(!sortAsc);
};

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  sortAsc: state.sortAsc,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  addHistory: (history, squares, pos) =>
    dispatch(addHistory(history, squares, pos)),
  updateStepNumber: stepNumber => dispatch(updateStepNumber(stepNumber)),
  updateXIsNext: xIsNext => dispatch(updateXIsNext(xIsNext)),
  toggleSortAsc: sortAsc => dispatch(toggleSortAsc(sortAsc))
});

const mergeProps = (stateProps, dispatchProps) => {
  const handleClick = squareIndex =>
    handleClickSquare(squareIndex, stateProps, dispatchProps);
  const jumpTo = (event, step) => jumpToStep(event, step, dispatchProps);
  const sort = () => sorting(stateProps, dispatchProps);
  const calculateWinner = (squares, curSquareIndex, size) =>
    calculateGameWinner(squares, curSquareIndex, size);

  return {
    ...stateProps,
    ...dispatchProps,
    handleClick,
    jumpTo,
    sort,
    calculateWinner
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Game);
