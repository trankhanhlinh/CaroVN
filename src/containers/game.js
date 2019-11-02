import { connect } from 'react-redux';
import Game from '../components/game';
import minimax from '../minimax';
import { calculateGameWinner, isDraw } from '../minimax/gameSquares';
import {
  isMinimaxSquaresFull,
  getMinimaxSquares
} from '../minimax/minimaxSquares';
import {
  addHistory,
  updateStepNumber,
  updateXIsNext,
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

const handleClickSquare = (i, stateProps, dispatchProps) => {
  const { history, stepNumber, gameMode } = stateProps;
  let { xIsNext } = stateProps;
  const newHistory = history.slice(0, stepNumber + 1);
  const current = newHistory[newHistory.length - 1];
  const squares = current.squares.slice();
  const { pos } = current;
  const size = 20;

  resetButtonsDefault();

  if (gameMode.isLocked || squares[i] || isDraw(squares)) {
    return;
  }

  // check previous step
  if (calculateGameWinner(squares, pos, size)) {
    return;
  }

  squares[i] = xIsNext ? 'X' : 'O';
  xIsNext = xIsNext !== true;

  dispatchProps.addHistory(newHistory, squares, i);
  dispatchProps.updateStepNumber(newHistory.length);
  dispatchProps.updateXIsNext(xIsNext);

  // computer's turn
  if (
    gameMode.mode === 'computer' &&
    !calculateGameWinner(squares, i, size) &&
    !isDraw(squares)
  ) {
    if (xIsNext === false) {
      let move = null;
      const updatedState = {
        history: newHistory.concat([
          {
            squares,
            pos: i
          }
        ]),
        stepNumber: newHistory.length,
        gameMode: {
          mode: gameMode.mode,
          isLocked: false
        },
        xIsNext
      };
      console.log('computer move');
      dispatchProps.updateIsGameLocked(true);
      const minimaxSquares = getMinimaxSquares(squares, i, size);
      const curMinimaxSquareIndex = minimaxSquares.findIndex(
        square => square.pos === i
      );
      if (isMinimaxSquaresFull(minimaxSquares)) {
        let randomPos = -1;
        setTimeout(() => {
          do {
            randomPos = Math.floor(Math.random() * size * size);
          } while (squares[randomPos] !== null);
          console.log('computer move draw', randomPos);
          dispatchProps.updateIsGameLocked(false);
          handleClickSquare(randomPos, updatedState, dispatchProps);
        }, 1000);
      } else {
        move = minimax(
          xIsNext,
          0,
          minimaxSquares,
          squares,
          curMinimaxSquareIndex,
          i,
          size
        );
        console.log('computer move ', move);
        dispatchProps.updateIsGameLocked(false);
        handleClickSquare(move.pos, updatedState, dispatchProps);
      }
    }
  }
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
  sortAsc: state.sortAsc,
  currentUser: state.auth.currentUser,
  gameMode: state.gameMode
});

const mapDispatchToProps = dispatch => ({
  addHistory: (history, squares, pos) =>
    dispatch(addHistory(history, squares, pos)),
  updateStepNumber: stepNumber => dispatch(updateStepNumber(stepNumber)),
  updateXIsNext: xIsNext => dispatch(updateXIsNext(xIsNext)),
  toggleSortAsc: sortAsc => dispatch(toggleSortAsc(sortAsc)),
  logout: () => dispatch(logout()),
  selectGameMode: mode => dispatch(selectGameMode(mode)),
  updateIsGameLocked: isLocked => dispatch(updateIsGameLocked(isLocked))
});

const mergeProps = (stateProps, dispatchProps) => {
  const handleClick = squareIndex =>
    handleClickSquare(squareIndex, stateProps, dispatchProps);
  const jumpTo = (event, step) => jumpToStep(event, step, dispatchProps);
  const sort = () => sorting(stateProps, dispatchProps);
  const calculateWinner = (squares, curSquareIndex, size) =>
    calculateGameWinner(squares, curSquareIndex, size);
  const isGameDraw = squares => isDraw(squares);
  const handleLogout = () => onLogout(dispatchProps);
  const handleSelectGameMode = mode => onSelectGameMode(mode, dispatchProps);

  return {
    ...stateProps,
    ...dispatchProps,
    handleClick,
    jumpTo,
    sort,
    calculateWinner,
    isGameDraw,
    handleLogout,
    handleSelectGameMode
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Game);
