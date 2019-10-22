import { REQUEST_LOGIN, RESPONSE_LOGIN, UPDATE_CUR_USER } from '../actions';

const login = (
  state = {
    isPending: false,
    username: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isPending: true, username: action.username };
    case RESPONSE_LOGIN:
      return {
        ...state,
        isPending: false,
        username: action.username,
        jwtToken: action.jwtToken,
        lastExecuted: action.receivedAt
      };
    default:
      return state;
  }
};

const users = (state = { currentUser: null }, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case RESPONSE_LOGIN:
      return {
        ...state,
        [action.username]: login(state[action.username], action)
      };
    case UPDATE_CUR_USER:
      return {
        ...state,
        currentUser: {
          username: action.username,
          id: action.id
        }
      };
    default:
      return state;
  }
};

export default users;
