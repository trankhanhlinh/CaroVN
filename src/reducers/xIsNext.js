import { UPDATE_XISNEXT, RESET_XISNEXT } from '../actions/type';

const xIsNext = (state = true, action) => {
  switch (action.type) {
    case UPDATE_XISNEXT:
      return action.xIsNext;
    case RESET_XISNEXT:
      return true;
    default:
      return state;
  }
};

export default xIsNext;
