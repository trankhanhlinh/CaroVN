import fetch from 'cross-fetch';

export const ADD_HISTORY = 'ADD_HISTORY';
export const UPDATE_STEPNUMBER = 'UPDATE_STEPNUMBER';
export const UPDATE_XISNEXT = 'UPDATE_XISNEXT';
export const TOGGLE_SORTASC = 'TOGGLE_SORTASC';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';
export const RESPONSE_REGISTER = 'RESPONSE_REGISTER';
export const REGISTER_USERNAME = 'REGISTER_USERNAME';
export const LOGIN_ERROR = 'LOGIN_ERROR';
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
    username
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
      .catch(() => {
        dispatch({
          type: REGISTER_ERROR,
          payload: 'Username already exists. Please try with another one!'
        });
      });
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

function responseLogin(json) {
  return {
    type: RESPONSE_LOGIN,
    payload: json.token
  };
}

export function authenticate(jwt) {
  return dispatch => {
    return fetch('https://restfulapi-passport-jwt.herokuapp.com/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(response => response.json())
      .then(json => dispatch(updateCurrentUser(json)))
      .catch();
  };
}

export function oauthFacebook(accessToken) {
  return dispatch => {
    return fetch(
      'https://restfulapi-passport-jwt.herokuapp.com/user/oauth/facebook',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: accessToken })
      }
    )
      .then(response => response.json())
      .then(json => {
        dispatch(responseLogin(json));
        dispatch(authenticate(json.token));
        localStorage.setItem('access_token', json.token);
      })
      .catch();
  };
}

export function oauthGoogle(accessToken) {
  return dispatch => {
    return fetch(
      'https://restfulapi-passport-jwt.herokuapp.com/user/oauth/google',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: accessToken })
      }
    )
      .then(response => response.json())
      .then(json => {
        // console.log('google error ', json);
        dispatch(responseLogin(json));
        dispatch(authenticate(json.token));
        localStorage.setItem('access_token', json.token);
      })
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
        dispatch(responseLogin(json));
        dispatch(authenticate(json.token));
        localStorage.setItem('access_token', json.token);
      })
      .catch(err => {
        dispatch({
          type: LOGIN_ERROR,
          payload: err.message
        });
      });
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
