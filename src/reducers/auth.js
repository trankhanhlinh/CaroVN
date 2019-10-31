import {
  REGISTER_ERROR,
  LOGIN_ERROR,
  REQUEST_REGISTER,
  RESPONSE_REGISTER,
  REQUEST_LOGIN,
  RESPONSE_LOGIN,
  UPDATE_CUR_USER,
  LOGOUT
} from '../actions/type';

const DEFAULT_USER_STATE = {
  isPending: false,
  username: null
};

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
  currentUser: DEFAULT_USER_STATE,
  newUser: DEFAULT_USER_STATE
};

const register = (state = DEFAULT_USER_STATE, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
      return { ...state, isPending: true, username: action.username };
    case RESPONSE_REGISTER:
      return { ...state, isPending: false, username: action.username };
    case REGISTER_ERROR:
      return DEFAULT_USER_STATE;
    default:
      return state;
  }
};

const login = (state = DEFAULT_USER_STATE, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isPending: true };
    case UPDATE_CUR_USER:
      return {
        ...state,
        isPending: false,
        username: action.username,
        id: action.id
      };
    case LOGIN_ERROR:
      return DEFAULT_USER_STATE;
    default:
      return state;
  }
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REQUEST_REGISTER:
    case RESPONSE_REGISTER:
      console.log('[REGISTER] state ', state);
      return {
        ...state,
        errorMessage: '',
        newUser: register(state.newUser, action)
      };
    case REGISTER_ERROR:
      console.log('[REGISTER_ERROR] state ', state);
      return {
        ...state,
        errorMessage: action.payload,
        newUser: register(state.newUser, action)
      };
    case REQUEST_LOGIN:
      console.log('[REQUEST_LOGIN] state ', state);
      return {
        ...state,
        errorMessage: '',
        currentUser: login(state.currentUser, action)
      };
    case RESPONSE_LOGIN:
      console.log('[RESPONSE_LOGIN] state ', state);
      return { ...state, isAuthenticated: true, token: action.payload };
    case UPDATE_CUR_USER:
      // console.log('[UPDATE_CUR_USER] state ', state);
      return { ...state, currentUser: login(state.currentUser, action) };
    case LOGIN_ERROR:
      console.log('[LOGIN_ERROR] state ', state);
      return {
        ...state,
        errorMessage: action.payload,
        currentUser: login(state.currentUser, action)
      };
    case LOGOUT:
      console.log('[LOGOUT] state ', state);
      return DEFAULT_STATE;
    default:
      return state;
  }
};
