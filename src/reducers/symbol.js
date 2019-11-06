import { UPDATE_SYMBOL, RESET_SYMBOL } from '../actions/type';

const symbol = (state = 'X', action) => {
  switch (action.type) {
    case UPDATE_SYMBOL:
      return action.symbol;
    case RESET_SYMBOL:
      return 'X';
    default:
      return state;
  }
};

export default symbol;
