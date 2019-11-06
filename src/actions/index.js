import fetch from 'cross-fetch';
import {
  SELECT_GAME_MODE,
  UPDATE_IS_GAME_LOCKED,
  ADD_HISTORY,
  UPDATE_STEPNUMBER,
  UPDATE_XISNEXT,
  UPDATE_SYMBOL,
  TOGGLE_SORTASC,
  REGISTER_ERROR,
  REQUEST_REGISTER,
  RESPONSE_REGISTER,
  LOGIN_ERROR,
  REQUEST_LOGIN,
  RESPONSE_LOGIN,
  UPDATE_CUR_USER,
  REQUEST_UPDATE_USER_INFO,
  RESPONSE_UPDATE_USER_INFO,
  RESPONSE_UPDATE_USER_PASSWORD,
  LOGOUT
} from './type';

export const selectGameMode = mode => ({
  type: SELECT_GAME_MODE,
  mode
});

export const updateIsGameLocked = isLocked => ({
  type: UPDATE_IS_GAME_LOCKED,
  isLocked
});

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

export const updateSymbol = symbol => ({
  type: UPDATE_SYMBOL,
  symbol
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `USERNAME=${newUser.USERNAME}&PASSWORD=${newUser.PASSWORD}&FIRSTNAME=${newUser.FIRSTNAME}&LASTNAME=${newUser.LASTNAME}&EMAIL=${newUser.EMAIL}`
      }
    )
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch({
            type: REGISTER_ERROR,
            payload: json.error.message
          });
        } else {
          dispatch(responseRegister(json.username));
        }
      })
      .catch();
  };
}

function updateCurrentUser(json) {
  // me
  return {
    type: UPDATE_CUR_USER,
    id: json.ID,
    username: json.USERNAME,
    password: json.PASSWORD,
    firstName: json.FIRSTNAME,
    lastName: json.LASTNAME,
    avatar: json.AVATAR,
    email: json.EMAIL
  };
}

function requestUpdateUser() {
  return {
    type: REQUEST_UPDATE_USER_INFO
  };
}

function responseUpdateUser(user) {
  return {
    type: RESPONSE_UPDATE_USER_INFO,
    firstName: user.FIRSTNAME,
    lastName: user.LASTNAME,
    email: user.EMAIL,
    avatar: user.AVATAR ? user.AVATAR : ''
  };
}

function responseUpdateUserPassword(user) {
  return {
    type: RESPONSE_UPDATE_USER_PASSWORD,
    password: user.PASSWORD
  };
}

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  };
}

function responseLogin(json) {
  return {
    type: RESPONSE_LOGIN,
    payload: json.token
  };
}

export function updateUserInfo(updatedUser) {
  return dispatch => {
    dispatch(requestUpdateUser());
    return fetch('https://restfulapi-passport-jwt.herokuapp.com/me/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `USERNAME=${updatedUser.USERNAME}&FIRSTNAME=${updatedUser.FIRSTNAME}&LASTNAME=${updatedUser.LASTNAME}&EMAIL=${updatedUser.EMAIL}`
    })
      .then(response => response.json())
      .then(json => {
        if (json.user) {
          dispatch(responseUpdateUser(json.user));
        } else {
          console.log('error ', json);
        }
      })
      .catch();
  };
}

export function updateUserPassword(updatedUser) {
  return dispatch => {
    dispatch(requestUpdateUser());
    return fetch(
      'https://restfulapi-passport-jwt.herokuapp.com/me/update-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `USERNAME=${updatedUser.USERNAME}&CUR_PASSWORD=${updatedUser.CUR_PASSWORD}&NEW_PASSWORD=${updatedUser.NEW_PASSWORD}`
      }
    )
      .then(response => response.json())
      .then(json => {
        if (json.user) {
          dispatch(responseUpdateUserPassword(json.user));
        } else {
          console.log('error ', json);
        }
      })
      .catch();
  };
}

export function updateUserInfoInCludingAvatar(updatedUser) {
  return dispatch => {
    dispatch(requestUpdateUser());
    const formData = new FormData();
    formData.append('avatar', updatedUser.AVATAR);
    return fetch(
      'https://restfulapi-passport-jwt.herokuapp.com/me/upload-avatar',
      {
        method: 'POST',
        body: formData
      }
    )
      .then(response => response.json())
      .then(json => {
        return fetch(
          'https://restfulapi-passport-jwt.herokuapp.com/me/update',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `USERNAME=${updatedUser.USERNAME}&FIRSTNAME=${updatedUser.FIRSTNAME}&LASTNAME=${updatedUser.LASTNAME}&EMAIL=${updatedUser.EMAIL}&AVATAR=${json.fileUrl}`
          }
        );
      })
      .then(response => response.json())
      .then(json => {
        if (json.user) {
          dispatch(responseUpdateUser(json.user));
        } else {
          console.log('error ', json);
        }
      })
      .catch();
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
      .then(json => {
        dispatch(updateCurrentUser(json));
      })
      .catch();
  };
}

export function oauthFacebook(accessToken) {
  return dispatch => {
    dispatch(requestLogin());
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
        if (json.token) {
          dispatch(responseLogin(json));
          dispatch(authenticate(json.token));
          localStorage.setItem('access_token', json.token);
        } else {
          // console.log('oauth facebook error ', json);
        }
      })
      .catch();
  };
}

export function oauthGoogle(accessToken) {
  return dispatch => {
    dispatch(requestLogin());
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
        if (json.token) {
          dispatch(responseLogin(json));
          dispatch(authenticate(json.token));
          localStorage.setItem('access_token', json.token);
        } else {
          // console.log('oauth google error ', json);
        }
      })
      .catch();
  };
}

export function login(user) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch('https://restfulapi-passport-jwt.herokuapp.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `USERNAME=${user.USERNAME}&PASSWORD=${user.PASSWORD}`
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(responseLogin(json));
          dispatch(authenticate(json.token));
          localStorage.setItem('access_token', json.token);
        } else if (json.error) {
          dispatch({
            type: LOGIN_ERROR,
            payload: json.error.message
          });
        }
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
