import { TOGGLE_SORTASC, RESET_SORTASC } from '../actions/type';

const sortAsc = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SORTASC:
      return !state;
    case RESET_SORTASC:
      return true;
    default:
      return state;
  }
};

export default sortAsc;
