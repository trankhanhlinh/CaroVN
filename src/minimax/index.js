const checkColumn = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng dọc
  while (
    curSquareIndex + i * size < size * size &&
    squares[curSquareIndex + i * size] &&
    squares[curSquareIndex + i * size] === squares[curSquareIndex]
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
    squares[curSquareIndex - i * size] &&
    squares[curSquareIndex - i * size] === squares[curSquareIndex]
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
        (squares[startIndexToWin - size] === null ||
          squares[endIndexToWin + size] === null)) ||
      (startIndexToWin - size < 0 &&
        endIndexToWin + size < size * size &&
        squares[endIndexToWin + size] === null) ||
      (startIndexToWin - size >= 0 &&
        endIndexToWin + size >= size * size &&
        squares[startIndexToWin - size] === null) ||
      (startIndexToWin - size < 0 && endIndexToWin + size >= size * size)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * size);
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkRow = (squares, curSquareIndex, size) => {
  let count = 1;
  let i = 1;
  let startIndexToWin = curSquareIndex;
  let endIndexToWin = curSquareIndex;

  // check hàng ngang
  const startIndexCurRow = parseInt(curSquareIndex / size, 10) * size;
  const endIndexCurRow = startIndexCurRow + size - 1;

  while (
    curSquareIndex + i <= endIndexCurRow &&
    squares[curSquareIndex + i] &&
    squares[curSquareIndex + i] === squares[curSquareIndex]
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
    squares[curSquareIndex - i] &&
    squares[curSquareIndex - i] === squares[curSquareIndex]
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
        (squares[startIndexToWin - 1] === null ||
          squares[endIndexToWin + 1] === null)) ||
      (startIndexToWin - 1 < startIndexCurRow &&
        endIndexToWin + 1 <= endIndexCurRow &&
        squares[endIndexToWin + 1] === null) ||
      (startIndexToWin - 1 >= startIndexCurRow &&
        endIndexToWin + 1 > endIndexCurRow &&
        squares[startIndexToWin - 1] === null) ||
      (startIndexToWin - 1 < startIndexCurRow &&
        endIndexToWin + 1 > endIndexCurRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j);
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkRightDiagonalRow = (squares, curSquareIndex, size) => {
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
    squares[curSquareIndex + i * (size + 1)] &&
    squares[curSquareIndex + i * (size + 1)] === squares[curSquareIndex]
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
    squares[curSquareIndex - i * (size + 1)] &&
    squares[curSquareIndex - i * (size + 1)] === squares[curSquareIndex]
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
        (squares[startIndexToWin - (size + 1)] === null ||
          squares[endIndexToWin + (size + 1)] === null)) ||
      (startIndexToWin - (size + 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) <= endIndexCurDiagonalRow &&
        squares[endIndexToWin + (size + 1)] === null) ||
      (startIndexToWin - (size + 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) > endIndexCurDiagonalRow &&
        squares[startIndexToWin - (size + 1)] === null) ||
      (startIndexToWin - (size + 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size + 1) > endIndexCurDiagonalRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size + 1));
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

const checkLeftDiagonalRow = (squares, curSquareIndex, size) => {
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
    squares[curSquareIndex + i * (size - 1)] &&
    squares[curSquareIndex + i * (size - 1)] === squares[curSquareIndex]
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
    squares[curSquareIndex - i * (size - 1)] &&
    squares[curSquareIndex - i * (size - 1)] === squares[curSquareIndex]
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
        (squares[startIndexToWin - (size - 1)] === null ||
          squares[endIndexToWin + (size - 1)] === null)) ||
      (startIndexToWin - (size - 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) <= endIndexCurDiagonalRow &&
        squares[endIndexToWin + (size - 1)] === null) ||
      (startIndexToWin - (size - 1) >= startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) > endIndexCurDiagonalRow &&
        squares[startIndexToWin - (size - 1)] === null) ||
      (startIndexToWin - (size - 1) < startIndexCurDiagonalRow &&
        endIndexToWin + (size - 1) > endIndexCurDiagonalRow)
    ) {
      // track winning square
      const winningSquares = [];
      for (let j = 0; j < count; j += 1) {
        winningSquares.push(startIndexToWin + j * (size - 1));
      }

      return {
        player: squares[curSquareIndex],
        winningSquares
      };
    }
  }

  return null;
};

export const calculateGameWinner = (squares, curSquareIndex, size) => {
  let result = null;

  result = checkColumn(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRow(squares, curSquareIndex, size);
  if (result) return result;

  result = checkRightDiagonalRow(squares, curSquareIndex, size);
  if (result) return result;

  result = checkLeftDiagonalRow(squares, curSquareIndex, size);
  if (result) return result;

  return null;
};

const getScore = (result, depth) => {
  if (result) {
    if (result.player === 'X') {
      return depth - 10; // human's turn
    }
    return 10 - depth; // computer's turn
  }

  return 0; // draw
};

export const isDraw = (squares, size) => {
  for (let i = 0; i < size * size; i += 1) {
    if (squares[i] === null) {
      return false;
    }
  }

  return true;
};

export const minimax = (xIsNext, depth, squares, curSquareIndex, size) => {
  const winner = calculateGameWinner(squares, curSquareIndex, size);
  if (winner || isDraw(squares, size)) {
    return getScore(winner, depth);
  }

  const newDepth = depth + 1;
  const moves = [];
  const turn = xIsNext ? 'X' : 'O';

  for (let i = 0; i < size * size; i += 1) {
    if (squares[i] === null) {
      const newSquares = squares.slice();
      newSquares[i] = turn;

      let score = minimax(!xIsNext, newDepth, newSquares, i, size);

      // score can be an object
      if (!(typeof score === 'number')) {
        score = score.score;
      }

      // set the values
      const move = {
        pos: i,
        score
      };

      moves.push(move);
    }
  }

  // find the idx with the max
  let min = 0;
  let max = 0;
  // go through the scores, find
  for (let i = 1; i < moves.length; i += 1) {
    if (moves[i].score > moves[max].score) {
      max = i;
    }
    if (moves[i].score < moves[min].score) {
      min = i;
    }
  }

  const result = turn === 'O' ? moves[max] : moves[min];
  return result;
};
