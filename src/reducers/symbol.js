import { UPDATE_SYMBOL } from '../actions/type';

const symbol = (state = 'X', action) => {
  switch (action.type) {
    case UPDATE_SYMBOL:
      return action.symbol;
    default:
      return state;
  }
};

export default symbol;
