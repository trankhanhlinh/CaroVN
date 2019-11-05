import { connect } from 'react-redux';
import Game from '../components/game';
import { minimax, recursiveLevel } from '../minimax';
import {
  calculateGameWinner,
  isDraw,
  gameSquaresSize
} from '../minimax/gameSquares';
import {
  isMinimaxSquaresFull,
  getMinimaxSquares,
  calculateGameWinnerMinimax,
  minimaxSquaresSize
} from '../minimax/minimaxSquares';
import {
  addHistory,
  updateStepNumber,
  updateXIsNext,
  updateSymbol,
  toggleSortAsc,
  logout,
  selectGameMode,
  updateIsGameLocked
} from '../actions';

const resetButtonsDefault = () => {
  const activeButtons = document.getElementsByClassName('active');

  if (activeButtons.length > 0) {
    activeButtons[0].classList.remove('active');
  }
};

const makeMove = (stateProps, dispatchProps) => {
  const { history, stepNumber } = stateProps;
  let { xIsNext } = stateProps;
  const newHistory = history.slice(0, stepNumber + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();
  const { pos } = current;
  let move = null;

  resetButtonsDefault();

  if (isDraw(squares)) {
    return;
  }

  // check previous step
  if (calculateGameWinner(squares, pos)) {
    return;
  }

  // computer's turn
  if (xIsNext === false) {
    dispatchProps.updateIsGameLocked(true);
    const minimaxSquares = getMinimaxSquares(squares, pos, gameSquaresSize);
    console.log('minimax squares ', minimaxSquares);
    const curMinimaxSquareIndex = minimaxSquares.findIndex(
      square => square.pos === pos
    );
    if (isMinimaxSquaresFull(minimaxSquares)) {
      let randomPos = -1;
      setTimeout(() => {
        do {
          randomPos = Math.floor(
            Math.random() * gameSquaresSize * gameSquaresSize
          );
        } while (squares[randomPos] !== null);
        dispatchProps.updateIsGameLocked(false);
        move = randomPos;
      }, 1000);
    } else if (
      calculateGameWinnerMinimax(minimaxSquares, curMinimaxSquareIndex)
    ) {
      let randomPos = -1;
      setTimeout(() => {
        do {
          randomPos = Math.floor(
            Math.random() * minimaxSquaresSize * minimaxSquaresSize
          );
        } while (minimaxSquares[randomPos].value !== null);
        dispatchProps.updateIsGameLocked(false);
        move = minimaxSquares[randomPos].pos;
      }, 1000);
    } else {
      move = minimax(
        xIsNext,
        0,
        recursiveLevel,
        minimaxSquares,
        squares,
        curMinimaxSquareIndex,
        pos,
        gameSquaresSize,
        -1000,
        1000
      );
      dispatchProps.updateIsGameLocked(false);
    }
  }

  squares[move.pos] = 'O';
  xIsNext = true;

  dispatchProps.addHistory(newHistory, squares, move.pos);
  dispatchProps.updateStepNumber(newHistory.length);
  dispatchProps.updateXIsNext(xIsNext);
};

const handleClickSquare = (i, stateProps, dispatchProps) => {
  const { history, stepNumber, gameMode, symbol } = stateProps;
  let { xIsNext } = stateProps;
  const newHistory = history.slice(0, stepNumber + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();
  const { pos } = current;

  resetButtonsDefault();

  const position = gameMode.mode === 'friend' ? i.position : i;

  if (gameMode.isLocked || squares[position] || isDraw(squares) || !xIsNext) {
    return;
  }

  // check previous step
  if (calculateGameWinner(squares, pos)) {
    return;
  }

  if (gameMode.mode === 'friend') {
    squares[position] = symbol;
    xIsNext = i.symbol !== symbol;
  } else {
    squares[position] = xIsNext ? 'X' : 'O';
    xIsNext = xIsNext !== true;
  }

  dispatchProps.addHistory(newHistory, squares, position);
  dispatchProps.updateStepNumber(newHistory.length);
  dispatchProps.updateXIsNext(xIsNext);

  // computer's turn
  if (gameMode.mode === 'computer') {
    const updatedState = {
      history: newHistory.concat([
        {
          squares,
          pos: position
        }
      ]),
      stepNumber: newHistory.length,
      gameMode: {
        mode: gameMode.mode,
        isLocked: false
      },
      xIsNext
    };

    makeMove(updatedState, dispatchProps);
  }

  // computer's turn
  // if (
  //   gameMode.mode === 'computer' &&
  //   !calculateGameWinner(squares, i) &&
  //   !isDraw(squares)
  // ) {
  //   if (xIsNext === false) {
  //     let move = null;
  //     const updatedState = {
  //       history: newHistory.concat([
  //         {
  //           squares,
  //           pos: i
  //         }
  //       ]),
  //       stepNumber: newHistory.length,
  //       gameMode: {
  //         mode: gameMode.mode,
  //         isLocked: false
  //       },
  //       xIsNext
  //     };
  //     dispatchProps.updateIsGameLocked(true);
  //     const minimaxSquares = getMinimaxSquares(squares, i, gameSquaresSize);
  //     console.log('minimax squares ', minimaxSquares);
  //     const curMinimaxSquareIndex = minimaxSquares.findIndex(
  //       square => square.pos === i
  //     );
  //     if (isMinimaxSquaresFull(minimaxSquares)) {
  //       let randomPos = -1;
  //       setTimeout(() => {
  //         do {
  //           randomPos = Math.floor(
  //             Math.random() * gameSquaresSize * gameSquaresSize
  //           );
  //         } while (squares[randomPos] !== null);
  //         dispatchProps.updateIsGameLocked(false);
  //         handleClickSquare(randomPos, updatedState, dispatchProps);
  //       }, 1000);
  //     } else if (
  //       calculateGameWinnerMinimax(minimaxSquares, curMinimaxSquareIndex)
  //     ) {
  //       let randomPos = -1;
  //       setTimeout(() => {
  //         do {
  //           randomPos = Math.floor(
  //             Math.random() * minimaxSquaresSize * minimaxSquaresSize
  //           );
  //         } while (minimaxSquares[randomPos].value !== null);
  //         dispatchProps.updateIsGameLocked(false);
  //         handleClickSquare(
  //           minimaxSquares[randomPos].pos,
  //           updatedState,
  //           dispatchProps
  //         );
  //       }, 1000);
  //     } else {
  //       move = minimax(
  //         xIsNext,
  //         0,
  //         recursiveLevel,
  //         minimaxSquares,
  //         squares,
  //         curMinimaxSquareIndex,
  //         i,
  //         gameSquaresSize,
  //         -1000,
  //         1000
  //       );
  //       dispatchProps.updateIsGameLocked(false);
  //       handleClickSquare(move.pos, updatedState, dispatchProps);
  //     }
  //   }
  // }
};

const jumpToStep = (event, step, stateProps, dispatchProps) => {
  const { gameMode } = stateProps;
  console.log(gameMode.isLocked);
  if (gameMode.isLocked) {
    return;
  }

  resetButtonsDefault();
  event.target.classList.add('active');

  dispatchProps.updateStepNumber(step);
  dispatchProps.updateXIsNext(step % 2 === 0); // step: odd is X, even is O

  const { history } = stateProps;
  const xIsNext = step % 2 === 0;
  // computer's turn
  if (gameMode.mode === 'computer' && !xIsNext) {
    const updatedState = {
      history,
      stepNumber: step,
      gameMode: {
        mode: gameMode.mode,
        isLocked: false
      },
      xIsNext
    };

    makeMove(updatedState, dispatchProps);
  }
};

const sorting = (stateProps, dispatchProps) => {
  const { sortAsc } = stateProps;

  dispatchProps.toggleSortAsc(!sortAsc);
};

const onLogout = dispatchProps => {
  dispatchProps.logout();
};

const onSelectGameMode = (mode, dispatchProps) => {
  dispatchProps.selectGameMode(mode);
};

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  symbol: state.symbol,
  sortAsc: state.sortAsc,
  currentUser: state.auth.currentUser,
  gameMode: state.gameMode
});

const mapDispatchToProps = dispatch => ({
  addHistory: (history, squares, pos) =>
    dispatch(addHistory(history, squares, pos)),
  updateStepNumber: stepNumber => dispatch(updateStepNumber(stepNumber)),
  updateXIsNext: xIsNext => dispatch(updateXIsNext(xIsNext)),
  updateSymbol: symbol => dispatch(updateSymbol(symbol)),
  toggleSortAsc: sortAsc => dispatch(toggleSortAsc(sortAsc)),
  logout: () => dispatch(logout()),
  selectGameMode: mode => dispatch(selectGameMode(mode)),
  updateIsGameLocked: isLocked => dispatch(updateIsGameLocked(isLocked))
});

const mergeProps = (stateProps, dispatchProps) => {
  const handleClick = squareIndex =>
    handleClickSquare(squareIndex, stateProps, dispatchProps);
  const jumpTo = (event, step) =>
    jumpToStep(event, step, stateProps, dispatchProps);
  const sort = () => sorting(stateProps, dispatchProps);
  const calculateWinner = (squares, curSquareIndex) =>
    calculateGameWinner(squares, curSquareIndex);
  const updateYourTurn = xIsNext => dispatchProps.updateXIsNext(xIsNext);
  const updateSquareSymbol = symbol => dispatchProps.updateSymbol(symbol);
  const isGameDraw = squares => isDraw(squares);
  const handleLogout = () => onLogout(dispatchProps);
  const handleSelectGameMode = mode => onSelectGameMode(mode, dispatchProps);
  const computerMove = () => makeMove(stateProps, dispatchProps);

  return {
    ...stateProps,
    ...dispatchProps,
    handleClick,
    jumpTo,
    sort,
    calculateWinner,
    updateYourTurn,
    updateSquareSymbol,
    isGameDraw,
    handleLogout,
    handleSelectGameMode,
    computerMove
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Game);
