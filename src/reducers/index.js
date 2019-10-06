import { combineReducers } from 'redux';
import history from './history';
import sortAsc from './sortAsc';
import stepNumber from './stepNumber';
import xIsNext from './xIsNext';

export default combineReducers({
  history,
  sortAsc,
  stepNumber,
  xIsNext
});
