import { REGISTER_USERNAME } from '../actions';

const registerUsername = (state = null, action) => {
  switch (action.type) {
    case REGISTER_USERNAME:
      return action.username;
    default:
      return state;
  }
};

export default registerUsername;
