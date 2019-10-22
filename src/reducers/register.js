import { REQUEST_REGISTER, RESPONSE_REGISTER } from '../actions';

const register = (
  state = {
    isPending: false,
    username: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return { ...state, isPending: true, username: action.username };
    case RESPONSE_REGISTER:
      return {
        ...state,
        isPending: false,
        username: action.username,
        lastExecuted: action.receivedAt
      };
    default:
      return state;
  }
};

const newUsers = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
    case RESPONSE_REGISTER:
      return {
        ...state,
        [action.username]: register(state[action.username], action)
      };
    default:
      return state;
  }
};

export default newUsers;
