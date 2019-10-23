import fetch from 'cross-fetch';

export const ADD_HISTORY = 'ADD_HISTORY';
export const UPDATE_STEPNUMBER = 'UPDATE_STEPNUMBER';
export const UPDATE_XISNEXT = 'UPDATE_XISNEXT';
export const TOGGLE_SORTASC = 'TOGGLE_SORTASC';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RESPONSE_REGISTER = 'RESPONSE_REGISTER';
export const REGISTER_USERNAME = 'REGISTER_USERNAME';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN';
export const UPDATE_CUR_USER = 'UPDATE_CUR_USER';
export const LOGOUT = 'LOGOUT';

export const addHistory = (history, squares, pos) => ({
  type: ADD_HISTORY,
  history,
  squares,
  pos
});

export const updateStepNumber = stepNumber => ({
  type: UPDATE_STEPNUMBER,
  stepNumber
});

export const updateXIsNext = xIsNext => ({
  type: UPDATE_XISNEXT,
  xIsNext
});

export const toggleSortAsc = () => ({
  type: TOGGLE_SORTASC
});

function requestRegister(newUser) {
  return {
    type: REQUEST_REGISTER,
    username: newUser.USERNAME
  };
}

function responseRegister(username) {
  return {
    type: RESPONSE_REGISTER,
    username,
    receivedAt: Date.now()
  };
}

export function register(newUser) {
  return dispatch => {
    dispatch(requestRegister(newUser));
    return fetch(
      'https://restfulapi-passport-jwt.herokuapp.com/user/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `USERNAME=${newUser.USERNAME}&PASSWORD=${newUser.PASSWORD}`
      }
    )
      .then(response => response.json())
      .then(() => dispatch(responseRegister(newUser.USERNAME)))
      .catch();
  };
}

export function updateCurrentUser(json) {
  // me
  return {
    type: UPDATE_CUR_USER,
    username: json.USERNAME,
    id: json.ID
  };
}

function requestLogin(user) {
  return {
    type: REQUEST_LOGIN,
    username: user.USERNAME
  };
}

function responseLogin(username, json) {
  return {
    type: RESPONSE_LOGIN,
    username,
    jwtToken: json
  };
}

export function authenticate(jwt) {
  return dispatch => {
    return fetch('https://restfulapi-passport-jwt.herokuapp.com/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(json => dispatch(updateCurrentUser(json)))
      .catch();
  };
}

export function login(user) {
  return dispatch => {
    dispatch(requestLogin(user));
    return fetch('https://restfulapi-passport-jwt.herokuapp.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `USERNAME=${user.USERNAME}&PASSWORD=${user.PASSWORD}`
    })
      .then(response => response.json())
      .then(json => {
        dispatch(responseLogin(user.USERNAME, json));
        dispatch(authenticate(json));
        localStorage.setItem('access_token', json);
      })
      .catch();
  };
}

function requestLogout() {
  return {
    type: LOGOUT
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('access_token');
    dispatch(requestLogout());
  };
}
