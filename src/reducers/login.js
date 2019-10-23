import {
  REQUEST_LOGIN,
  RESPONSE_LOGIN,
  UPDATE_CUR_USER,
  LOGOUT
} from '../actions';

const login = (
  state = {
    isPending: false,
    username: null,
    jwtToken: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isPending: true };
    case RESPONSE_LOGIN:
      return { ...state, jwtToken: action.jwtToken };
    case UPDATE_CUR_USER:
      return {
        ...state,
        isPending: false,
        username: action.username,
        id: action.id
      };
    default:
      return state;
  }
};

const users = (
  state = {
    currentUser: {
      isPending: false,
      username: null,
      jwtToken: null
    }
  },
  action
) => {
  switch (action.type) {
    case REQUEST_LOGIN:
    case RESPONSE_LOGIN:
    case UPDATE_CUR_USER:
      return {
        ...state,
        currentUser: login(state.currentUser, action)
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: {
          isPending: false,
          username: null,
          jwtToken: null
        }
      };
    default:
      return state;
  }
};

export default users;
