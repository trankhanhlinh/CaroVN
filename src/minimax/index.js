import {
  calculateGameWinnerMinimax,
  isMinimaxSquaresFull
} from './minimaxSquares';

const getScore = (result, depth) => {
  if (result) {
    if (result.player === 'X') {
      return depth - 10; // human's turn
    }
    return 10 - depth; // computer's turn
  }

  return 0; // draw
};

export default function minimax(
  xIsNext,
  depth,
  minimaxSquares,
  squares,
  curMinimaxSquareIndex,
  curSquareIndex,
  size
) {
  const winner = calculateGameWinnerMinimax(
    minimaxSquares,
    curMinimaxSquareIndex,
    3
  );
  if (winner || isMinimaxSquaresFull(minimaxSquares)) {
    return getScore(winner, depth);
  }

  const newDepth = depth + 1;
  const moves = [];
  const turn = xIsNext ? 'X' : 'O';

  for (let i = 0; i < minimaxSquares.length; i += 1) {
    if (
      minimaxSquares[i].value === null &&
      minimaxSquares[i].pos !== curSquareIndex
    ) {
      const newSquares = squares.slice();
      newSquares[minimaxSquares[i].pos] = turn;
      const newMinimaxSquares = minimaxSquares.slice();
      newMinimaxSquares[i].value = turn;

      let score = minimax(
        !xIsNext,
        newDepth,
        newMinimaxSquares,
        newSquares,
        i,
        newMinimaxSquares[i].pos,
        size
      );

      // score can be an object
      if (!(typeof score === 'number')) {
        score = score.score;
      }

      // set the values
      const move = {
        pos: newMinimaxSquares[i].pos,
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
}
