import { ADD_HISTORY, RESET_HISTORY } from '../actions/type';

const history = (
  state = [
    {
      squares: Array(400).fill(null),
      pos: -1
    }
  ],
  action
) => {
  switch (action.type) {
    case ADD_HISTORY:
      return action.history.concat([
        {
          squares: action.squares,
          pos: action.pos
        }
      ]);
    case RESET_HISTORY:
      return [
        {
          squares: Array(400).fill(null),
          pos: -1
        }
      ];
    default:
      return state;
  }
};

export default history;
