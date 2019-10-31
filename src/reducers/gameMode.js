import { SELECT_GAME_MODE, UPDATE_IS_GAME_LOCKED } from '../actions/type';

const gameMode = (state = { mode: 'normal', isLocked: false }, action) => {
  switch (action.type) {
    case SELECT_GAME_MODE:
      return { ...state, mode: action.mode };
    case UPDATE_IS_GAME_LOCKED:
      return { ...state, isLocked: action.isLocked };
    default:
      return state;
  }
};

export default gameMode;
