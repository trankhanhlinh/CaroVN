import { combineReducers } from 'redux';
import history from './history';
import sortAsc from './sortAsc';
import stepNumber from './stepNumber';
import xIsNext from './xIsNext';
import newUsers from './register';
import users from './login';
import registerUsername from './registerUsername';

export default combineReducers({
  history,
  sortAsc,
  stepNumber,
  xIsNext,
  newUsers,
  users,
  registerUsername
});
