import { ADD_HISTORY } from '../actions';

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
    default:
      return state;
  }
};

export default history;