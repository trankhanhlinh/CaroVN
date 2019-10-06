export const addHistory = (history, squares, pos) => ({
  type: 'ADD_HISTORY',
  history,
  squares,
  pos
});

export const updateStepNumber = stepNumber => ({
  type: 'UPDATE_STEPNUMBER',
  stepNumber
});

export const updateXIsNext = xIsNext => ({
  type: 'UPDATE_XISNEXT',
  xIsNext
});

export const toggleSortAsc = () => ({
  type: 'TOGGLE_SORTASC'
});
