import { UPDATE_STEPNUMBER } from '../actions';

const stepNumber = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_STEPNUMBER:
      return action.stepNumber;
    default:
      return state;
  }
};

export default stepNumber;
