import { combineReducers } from 'redux';
import history from './history';
import sortAsc from './sortAsc';
import stepNumber from './stepNumber';
import xIsNext from './xIsNext';
import newUsers from './register';
import users from './login';

const appReducer = combineReducers({
  history,
  sortAsc,
  stepNumber,
  xIsNext,
  newUsers,
  users
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
