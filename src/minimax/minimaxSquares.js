export const minimaxSquaresSize = 5;
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

  if (count >= minimaxSquaresSize) {
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

  if (count >= minimaxSquaresSize) {
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

  if (count >= minimaxSquaresSize) {
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

  if (count >= minimaxSquaresSize) {
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

export const calculateGameWinnerMinimax = (squares, curSquareIndex) => {
  let result = null;

  if (squares.length === 0) {
    return null;
  }

  result = checkColumnMinimax(squares, curSquareIndex, minimaxSquaresSize);
  if (result) return result;

  result = checkRowMinimax(squares, curSquareIndex, minimaxSquaresSize);
  if (result) return result;

  result = checkRightDiagonalRowMinimax(
    squares,
    curSquareIndex,
    minimaxSquaresSize
  );
  if (result) return result;

  result = checkLeftDiagonalRowMinimax(
    squares,
    curSquareIndex,
    minimaxSquaresSize
  );
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

const getMaxAlignWithX = (validOPositionInMinimax, minimaxSquares) => {
  const newMinimaxSquares = JSON.parse(JSON.stringify(minimaxSquares));
  newMinimaxSquares[validOPositionInMinimax].value = 'O';
  let countRightDiagonal = 0;
  let countLeftDiagonal = 0;
  let countEachRow = 0;
  let countEachColumn = 0;
  let maxCount = 0;
  let squareValue = '';
  const curRow = parseInt(validOPositionInMinimax / minimaxSquaresSize, 10);
  const curColumn = parseInt(validOPositionInMinimax % minimaxSquaresSize, 10);

  for (let i = 0; i < minimaxSquaresSize; i += 1) {
    // check row, column
    if (i === curRow) {
      countEachRow += 1;
      for (let j = 0; j < minimaxSquaresSize; j += 1) {
        squareValue = newMinimaxSquares[i * minimaxSquaresSize + j].value;
        if (squareValue !== null) {
          if (squareValue === 'X') {
            countEachRow += 1;
          } else if (i * minimaxSquaresSize + j !== validOPositionInMinimax) {
            countEachRow -= 1;
          }
        }
      }
    }
    if (i === curColumn) {
      countEachColumn += 1;
      for (let j = 0; j < minimaxSquaresSize; j += 1) {
        squareValue = newMinimaxSquares[i + j * minimaxSquaresSize].value;
        if (squareValue !== null) {
          if (squareValue === 'X') {
            countEachColumn += 1;
          } else if (i + j * minimaxSquaresSize !== validOPositionInMinimax) {
            countEachColumn -= 1;
          }
        }
      }
    }

    if (
      countEachRow === minimaxSquaresSize ||
      countEachColumn === minimaxSquaresSize
    ) {
      return minimaxSquaresSize; // found
    }

    if (countEachRow > maxCount) {
      maxCount = countEachRow;
    }
    if (countEachColumn > maxCount) {
      maxCount = countEachColumn;
    }
  }

  for (let k = 0; k < minimaxSquaresSize; k += 1) {
    // check right diagonal
    if (k * (minimaxSquaresSize + 1) === validOPositionInMinimax) {
      countRightDiagonal += 1;
      for (let i = 0; i < minimaxSquaresSize; i += 1) {
        squareValue = newMinimaxSquares[i * (minimaxSquaresSize + 1)].value;
        if (squareValue !== null) {
          if (squareValue === 'X') {
            countRightDiagonal += 1;
          } else if (i * (minimaxSquaresSize + 1) !== validOPositionInMinimax) {
            countRightDiagonal -= 1;
          }
        }
      }
      break;
    }
  }
  for (let k = 0; k < minimaxSquaresSize; k += 1) {
    // check left diagonal
    if ((k + 1) * (minimaxSquaresSize - 1) === validOPositionInMinimax) {
      countLeftDiagonal += 1;
      for (let i = 0; i < minimaxSquaresSize; i += 1) {
        squareValue =
          newMinimaxSquares[(i + 1) * (minimaxSquaresSize - 1)].value;
        if (squareValue !== null) {
          if (squareValue === 'X') {
            countLeftDiagonal += 1;
          } else if (
            (i + 1) * (minimaxSquaresSize - 1) !==
            validOPositionInMinimax
          ) {
            countLeftDiagonal -= 1;
          }
        }
      }
      break;
    }
  }

  if (
    countRightDiagonal === minimaxSquaresSize ||
    countLeftDiagonal === minimaxSquaresSize
  ) {
    return minimaxSquaresSize; // found
  }

  if (countRightDiagonal > maxCount) {
    maxCount = countRightDiagonal;
  }
  if (countLeftDiagonal > maxCount) {
    maxCount = countLeftDiagonal;
  }

  return maxCount; // not found
};

export const getPosMostAlignWithX = (
  validOPositionsInMinimax,
  minimaxSquares
) => {
  const result = { count: 0, posInMinimax: -1 };

  for (let i = 0; i < validOPositionsInMinimax.length; i += 1) {
    const count = getMaxAlignWithX(
      validOPositionsInMinimax[i].pos,
      minimaxSquares
    );
    if (count === minimaxSquaresSize) {
      result.count = minimaxSquaresSize;
      result.posInMinimax = validOPositionsInMinimax[i].pos;
      return result.posInMinimax;
    }
    if (count > result.count) {
      result.count = count;
      result.posInMinimax = validOPositionsInMinimax[i].pos;
    }
  }

  return result.posInMinimax;
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

  while (count < minimaxSquaresSize) {
    if (checkedRow < curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex - size * (curRow - checkedRow) + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex - size * (curRow - checkedRow) - i;
        // } else {
        //   // 2x2
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (1 - i);
        // } else {
        //   // 3x3
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (1 - i);
        // } else if (curColumn === 1) {
        //   // 4x4
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (1 - i);
        // } else {
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (2 - i);
        // } else if (curColumn === 1) {
        // 5x5
        minimaxPos = curIndex - size * (curRow - checkedRow) - (1 - i);
      } else if (curColumn === size - 2) {
        minimaxPos = curIndex - size * (curRow - checkedRow) - (3 - i);
      } else {
        minimaxPos = curIndex - size * (curRow - checkedRow) - (2 - i);
        // } else if (curColumn === 1 || curColumn === 2 || curColumn === 3) {
        //   // 6x6
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (curColumn - i);
        // } else {
        //   minimaxPos = curIndex - size * (curRow - checkedRow) - (4 - i);
      }
    } else if (checkedRow > curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex + size * (checkedRow - curRow) + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex + size * (checkedRow - curRow) - i;
        // } else {
        //   // 2x2
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (1 - i);
        // } else {
        //   // 3x3
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (1 - i);
        // } else if (curColumn === 1) {
        //   // 4x4
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (1 - i);
        // } else {
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (2 - i);
        // } else if (curColumn === 1) {
        // 5x5
        minimaxPos = curIndex + size * (checkedRow - curRow) - (1 - i);
      } else if (curColumn === size - 2) {
        minimaxPos = curIndex + size * (checkedRow - curRow) - (3 - i);
      } else {
        minimaxPos = curIndex + size * (checkedRow - curRow) - (2 - i);
        // } else if (curColumn === 1 || curColumn === 2 || curColumn === 3) {
        //   // 6x6
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (curColumn - i);
        // } else {
        //   minimaxPos = curIndex + size * (checkedRow - curRow) - (4 - i);
      }
    } else if (checkedRow === curRow) {
      if (curColumn === 0) {
        minimaxPos = curIndex + i;
      } else if (curColumn === size - 1) {
        minimaxPos = curIndex - i;
        // } else { // 2x2
        //   minimaxPos = curIndex - (1 - i);
        // } else {
        //   // 3x3
        //   minimaxPos = curIndex - (1 - i);
        // } else if (curColumn === 1) {
        //   // 4x4
        //   minimaxPos = curIndex - (1 - i);
        // } else {
        //   minimaxPos = curIndex - (2 - i);
        // } else if (curColumn === 1) {
        // 5x5
        minimaxPos = curIndex - (1 - i);
      } else if (curColumn === size - 2) {
        minimaxPos = curIndex - (3 - i);
      } else {
        minimaxPos = curIndex - (2 - i);
        // } else if (curColumn === 1 || curColumn === 2 || curColumn === 3) {
        //   // 6x6
        //   minimaxPos = curIndex - (curColumn - i);
        // } else {
        //   minimaxPos = curIndex - (4 - i);
      }
    }

    if (rowEndIndex >= minimaxPos && minimaxPos >= rowStartIndex) {
      minimaxSquares.push({ value: squares[minimaxPos], pos: minimaxPos });
      count += 1;
    }

    i += 1;
  }
};

const sortMinimaxSquares = squares => {
  squares.sort((a, b) => {
    return a.pos - b.pos;
  });

  return squares;
};

export const getMinimaxSquares = (squares, curIndex, size) => {
  const minimaxSquares = [];
  const curRow = parseInt(curIndex / size, 10);
  let rowStart = 0;
  let rowEnd = 0;

  if (curRow === 0) {
    for (let i = 0; i < minimaxSquaresSize; i += 1) {
      rowStart = i * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  } else if (curRow === size - 1) {
    for (let i = 0; i < minimaxSquaresSize; i += 1) {
      rowStart = (size - 1 - i) * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
    // } else {
    //   // 2x2
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = (curRow - 1 + i) * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
    // } else if (curRow === 1) {
    //   // 4x4
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = i * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
    // } else {
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = (curRow - 2 + i) * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
    // } else {
    //   // 3x3
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = (curRow - 1 + i) * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
  } else if (curRow === 1) {
    // 5x5
    for (let i = 0; i < minimaxSquaresSize; i += 1) {
      rowStart = i * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  } else if (curRow === size - 2) {
    for (let i = 0; i < minimaxSquaresSize; i += 1) {
      rowStart = (size - 1 - i) * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
  } else {
    for (let i = 0; i < minimaxSquaresSize; i += 1) {
      rowStart = (curRow - 2 + i) * size;
      rowEnd = rowStart + size - 1;
      rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    }
    // } else if (curRow === 1 || curRow === 2 || curRow === 3) {
    //   // 6x6
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = i * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
    // } else {
    //   for (let i = 0; i < minimaxSquaresSize; i += 1) {
    //     rowStart = (curRow - 4 + i) * size;
    //     rowEnd = rowStart + size - 1;
    //     rowCheck(rowStart, rowEnd, squares, curIndex, size, minimaxSquares);
    //   }
  }

  return sortMinimaxSquares(minimaxSquares);
};
