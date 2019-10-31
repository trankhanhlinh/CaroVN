import { REQUEST_REGISTER, RESPONSE_REGISTER } from '../actions/type';

const DEFAULT_STATE = {
  isPending: false,
  username: null
};

const register = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return { ...state, isPending: true, username: action.username };
    case RESPONSE_REGISTER:
      return {
        ...state,
        isPending: false,
        username: action.username
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
