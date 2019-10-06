const xIsNext = (state = true, action) => {
  switch (action.type) {
    case 'UPDATE_XISNEXT':
      return action.xIsNext;
    default:
      return state;
  }
};

export default xIsNext;
