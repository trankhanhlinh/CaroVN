const checkColumnMinimax = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng dọc
  while (
    curSquareIndex + i * size < size * size &&
    squares[curSquareIndex + i * size].value &&
    squares[curSquareIndex + i * size].value === squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save end index to win
  if (i !== 1) {
    endIndexToWin = curSquareIndex + (i - 1) * size;
  }

  i = 1;
  while (
    curSquareIndex - i * size >= 0 &&
    squares[curSquareIndex - i * size].value &&
    squares[curSquareIndex - i * size].value === squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save start index to win
  if (i !== 1) {
    startIndexToWin = curSquareIndex - (i - 1) * size;
  }

  if (count >= 3) {
    if (
      (startIndexToWin - size >= 0 &&
        endIndexToWin + size < size * size &&
        (squares[startIndexToWin - size].value === null ||
          squares[endIndexToWin + size].value === null)) ||
      (startIndexToWin - size < 0 &&
        endIndexToWin + size < size * size &&
        squares[endIndexToWin + size].value === null) ||
      (startIndexToWin - size >= 0 &&
        endIndexToWin + size >= size * size &&
        squares[startIndexToWin - size].value === null) ||
      (startIndexToWin - size < 0 && endIndexToWin + size >= size * size)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * size);
      }

      return {
        player: squares[curSquareIndex].value,
        winningSquares
      };
    }
  }

  return null;
};

const checkRowMinimax = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng ngang
  const startIndexCurRow = parseInt(curSquareIndex / size, 10) * size;
  const endIndexCurRow = startIndexCurRow + size - 1;

  while (
    curSquareIndex + i <= endIndexCurRow &&
    squares[curSquareIndex + i].value &&
    squares[curSquareIndex + i].value === squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save end index to win
  if (i !== 1) {
    endIndexToWin = curSquareIndex + (i - 1);
  }

  i = 1;
  while (
    curSquareIndex - i >= startIndexCurRow &&
    squares[curSquareIndex - i].value &&
    squares[curSquareIndex - i].value === squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save start index to win
  if (i !== 1) {
    startIndexToWin = curSquareIndex - (i - 1);
  }

  if (count >= 3) {
    if (
      (startIndexToWin - 1 >= startIndexCurRow &&
        endIndexToWin + 1 <= endIndexCurRow &&
        (squares[startIndexToWin - 1].value === null ||
          squares[endIndexToWin + 1].value === null)) ||
      (startIndexToWin - 1 < startIndexCurRow &&
        endIndexToWin + 1 <= endIndexCurRow &&
        squares[endIndexToWin + 1].value === null) ||
      (startIndexToWin - 1 >= startIndexCurRow &&
        endIndexToWin + 1 > endIndexCurRow &&
        squares[startIndexToWin - 1].value === null) ||
      (startIndexToWin - 1 < startIndexCurRow &&
        endIndexToWin + 1 > endIndexCurRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j);
      }

      return {
        player: squares[curSquareIndex].value,
        winningSquares
      };
    }
  }

  return null;
};

const checkRightDiagonalRowMinimax = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng chéo TB-ĐN
  let startIndexCurDiagonalRow = curSquareIndex;
  while (
    startIndexCurDiagonalRow > size - 1 &&
    startIndexCurDiagonalRow % size !== 0
  ) {
    startIndexCurDiagonalRow -= size + 1;
  }

  let endIndexCurDiagonalRow = curSquareIndex;
  while (
    endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
    (endIndexCurDiagonalRow + 1) % size !== 0
  ) {
    endIndexCurDiagonalRow += size + 1;
  }

  while (
    curSquareIndex + i * (size + 1) <= endIndexCurDiagonalRow &&
    squares[curSquareIndex + i * (size + 1)].value &&
    squares[curSquareIndex + i * (size + 1)].value ===
      squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save end index to win
  if (i !== 1) {
    endIndexToWin = curSquareIndex + (i - 1) * (size + 1);
  }
  i = 1;
  while (
    curSquareIndex - i * (size + 1) >= startIndexCurDiagonalRow &&
    squares[curSquareIndex - i * (size + 1)].value &&
    squares[curSquareIndex - i * (size + 1)].value ===
      squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save start index to win
  if (i !== 1) {
    startIndexToWin = curSquareIndex - (i - 1) * (size + 1);
  }

  if (count >= 3) {
    if (
      (startIndexToWin - (size + 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) <= endIndexCurDiagonalRow &&
        (squares[startIndexToWin - (size + 1)].value === null ||
          squares[endIndexToWin + (size + 1)].value === null)) ||
      (startIndexToWin - (size + 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) <= endIndexCurDiagonalRow &&
        squares[endIndexToWin + (size + 1)].value === null) ||
      (startIndexToWin - (size + 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) > endIndexCurDiagonalRow &&
        squares[startIndexToWin - (size + 1)].value === null) ||
      (startIndexToWin - (size + 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) > endIndexCurDiagonalRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size + 1));
      }

      return {
        player: squares[curSquareIndex].value,
        winningSquares
      };
    }
  }

  return null;
};

const checkLeftDiagonalRowMinimax = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng chéo ĐB-TN
  let startIndexCurDiagonalRow = curSquareIndex;
  while (
    startIndexCurDiagonalRow > size - 1 &&
    (startIndexCurDiagonalRow + 1) % size !== 0
  ) {
    startIndexCurDiagonalRow -= size - 1;
  }

  let endIndexCurDiagonalRow = curSquareIndex;
  while (
    endIndexCurDiagonalRow < size * size - 1 - (size - 1) &&
    endIndexCurDiagonalRow % size !== 0
  ) {
    endIndexCurDiagonalRow += size - 1;
  }

  while (
    curSquareIndex + i * (size - 1) <= endIndexCurDiagonalRow &&
    squares[curSquareIndex + i * (size - 1)].value &&
    squares[curSquareIndex + i * (size - 1)].value ===
      squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save end index to win
  if (i !== 1) {
    endIndexToWin = curSquareIndex + (i - 1) * (size - 1);
  }

  i = 1;
  while (
    curSquareIndex - i * (size - 1) >= startIndexCurDiagonalRow &&
    squares[curSquareIndex - i * (size - 1)].value &&
    squares[curSquareIndex - i * (size - 1)].value ===
      squares[curSquareIndex].value
  ) {
    count += 1;
    i += 1;
  }
  // save start index to win
  if (i !== 1) {
    startIndexToWin = curSquareIndex - (i - 1) * (size - 1);
  }

  if (count >= 3) {
    if (
      (startIndexToWin - (size - 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) <= endIndexCurDiagonalRow &&
        (squares[startIndexToWin - (size - 1)].value === null ||
          squares[endIndexToWin + (size - 1)].value === null)) ||
      (startIndexToWin - (size - 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) <= endIndexCurDiagonalRow &&
        squares[endIndexToWin + (size - 1)].value === null) ||
      (startIndexToWin - (size - 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) > endIndexCurDiagonalRow &&
        squares[startIndexToWin - (size - 1)].value === null) ||
      (startIndexToWin - (size - 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) > endIndexCurDiagonalRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size - 1));
      }

      return {
        player: squares[curSquareIndex].value,
        winningSquares
      };
    }
  }

  return null;
};

export const calculateGameWinnerMinimax = (squares, curSquareIndex, size) => {
  let result = null;

  if (squares.length === 0) {
    return null;
  }

  result = checkColumnMinimax(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRowMinimax(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRightDiagonalRowMinimax(squares, curSquareIndex, size);
  if (result) return result;

  result = checkLeftDiagonalRowMinimax(squares, curSquareIndex, size);
  if (result) return result;

  return null;
};

export const isMinimaxSquaresFull = squares => {
  if (squares.length === 0) {
    return false;
  }

  for (let i = 0; i < squares.length; i += 1) {
    if (squares[i].value === null) {
      return false;
    }
  }

  return true;
};

const rowCheck = (
  rowStartIndex,
  rowEndIndex,
  squares,
  curIndex,
  size,
  minimaxSquares
) => {
  let count = 0;
  let i = 0;
  let minimaxPos = -1;
  const curRow = parseInt(curIndex / size, 10);
  const curColumn = parseInt(curIndex % size, 10);
  const checkedRow = parseInt(rowStartIndex / size, 10);

  while (count < 3) {
    if (checkedRow < curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex - size * (curRow - checkedRow) + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex - size * (curRow - checkedRow) - i;
      } else {
        minimaxPos = curIndex - size * (curRow - checkedRow) - (1 - i);
      }
    } else if (checkedRow > curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex + size * (checkedRow - curRow) + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex + size * (checkedRow - curRow) - i;
      } else {
        minimaxPos = curIndex + size * (checkedRow - curRow) - (1 - i);
      }
    } else if (checkedRow === curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex - i;
      } else {
        minimaxPos = curIndex - (1 - i);
      }
    }

    if (rowEndIndex >= minimaxPos && minimaxPos >= rowStartIndex) {
      minimaxSquares.push({ value: squares[minimaxPos], pos: minimaxPos });
      count += 1;
    }

    i += 1;
  }
};

export const getMinimaxSquares = (squares, curIndex, size) => {
  const minimaxSquares = [];
  const curRow = parseInt(curIndex / size, 10);
  let rowStart = 0;
  let rowEnd = 0;

  if (curRow === 0) {
    for (let i = 0; i < 3; i += 1) {
      rowStart = i * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  } else if (curRow === size - 1) {
    for (let i = 0; i < 3; i += 1) {
      rowStart = (size - 1 - i) * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  } else {
    for (let i = 0; i < 3; i += 1) {
      rowStart = (curRow - 1 + i) * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  }

  return minimaxSquares;
};
