import { TOGGLE_SORTASC } from '../actions';

const sortAsc = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_SORTASC:
      return !state;
    default:
      return state;
  }
};

export default sortAsc;
