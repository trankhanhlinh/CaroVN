import { UPDATE_STEPNUMBER, RESET_STEPNUMBER } from '../actions/type';

const stepNumber = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_STEPNUMBER:
      return action.stepNumber;
    case RESET_STEPNUMBER:
      return 0;
    default:
      return state;
  }
};

export default stepNumber;
