import { combineReducers } from 'redux';
import gameMode from './gameMode';
import history from './history';
import sortAsc from './sortAsc';
import stepNumber from './stepNumber';
import xIsNext from './xIsNext';
import symbol from './symbol';
import auth from './auth';

const appReducer = combineReducers({
  gameMode,
  history,
  sortAsc,
  stepNumber,
  xIsNext,
  symbol,
  auth
});

const rootReducer = (state, action) => {
  let appState = state;
  if (action.type === 'LOGOUT') {
    const { routing } = state;
    appState = { routing };
  }

  return appReducer(appState, action);
};

export default rootReducer;
