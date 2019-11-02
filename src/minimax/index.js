import {
  calculateGameWinnerMinimax,
  isMinimaxSquaresFull,
  getPosMostAlignWithX
} from './minimaxSquares';

export const recursiveLevel = 6;

const getScore = (result, depth) => {
  if (result) {
    if (result.player === 'X') {
      return depth - 10; // human's turn
    }
    return 10 - depth; // computer's turn
  }

  return 0; // draw
};

export const minimax = (
  xIsNext,
  depth,
  level,
  minimaxSquares,
  squares,
  curMinimaxSquareIndex,
  curSquareIndex,
  size,
  alpha,
  beta
) => {
  const winner = calculateGameWinnerMinimax(
    minimaxSquares,
    curMinimaxSquareIndex
  );
  if (level === 0) {
    // console.log('level = 0');
  }
  if (winner || isMinimaxSquaresFull(minimaxSquares) || level === 0) {
    return getScore(winner, depth);
  }

  const turn = xIsNext ? 'X' : 'O';
  let validOPositionsInMinimax = [];
  let newBeta = beta;
  let newAlpha = alpha;
  let pos = -1;
  let tempPos = -1;
  //   console.log('');
  //   console.log(`======== level ${turn}: ${level}`);
  //   console.log('beta ', newBeta);
  //   console.log('alpha ', newAlpha);

  if (xIsNext) {
    for (let i = 0; i < minimaxSquares.length; i += 1) {
      if (
        minimaxSquares[i].value === null &&
        minimaxSquares[i].pos !== curSquareIndex
      ) {
        // console.log('');
        // console.log('check X ', minimaxSquares[i].pos);
        // console.log('');
        const newSquares = squares.slice();
        newSquares[minimaxSquares[i].pos] = turn;
        const newMinimaxSquares = JSON.parse(JSON.stringify(minimaxSquares));
        newMinimaxSquares[i].value = turn;

        let score = minimax(
          !xIsNext,
          depth + 1,
          level - 1,
          newMinimaxSquares,
          newSquares,
          i,
          newMinimaxSquares[i].pos,
          size,
          newAlpha,
          newBeta
        );

        // score can be an object
        if (!(typeof score === 'number')) {
          score = score.score;
        }

        // human
        if (score < newBeta) {
          newBeta = score;
          pos = newMinimaxSquares[i].pos;
        }

        tempPos = newMinimaxSquares[i].pos; // end of loop but not enter above if.

        if (newAlpha >= newBeta) break; // alpha cut-off
      }
    }

    // console.log('');
    // console.log('>>>>>>> level X: ', level);
    // console.log('beta ', newBeta);
    // console.log('alpha ', newAlpha);

    if (pos === -1) {
      pos = tempPos;
    }
    // console.log('pos ', pos);

    return { pos, score: newBeta };
  }

  // computer
  for (let i = 0; i < minimaxSquares.length; i += 1) {
    if (
      minimaxSquares[i].value === null &&
      minimaxSquares[i].pos !== curSquareIndex
    ) {
      //   console.log('');
      //   console.log('check O ', minimaxSquares[i].pos);
      //   console.log('');
      const newSquares = squares.slice();
      newSquares[minimaxSquares[i].pos] = turn;
      const newMinimaxSquares = JSON.parse(JSON.stringify(minimaxSquares));
      newMinimaxSquares[i].value = turn;

      let score = minimax(
        !xIsNext,
        depth + 1,
        level - 1,
        newMinimaxSquares,
        newSquares,
        i,
        newMinimaxSquares[i].pos,
        size,
        newAlpha,
        newBeta
      );

      // score can be an object
      if (!(typeof score === 'number')) {
        score = score.score;
      }

      //   console.log('');
      //   console.log('>>>>>>> level OO: ', level);
      //   console.log('alpha ', newAlpha);
      //   console.log('pos ', newMinimaxSquares[i].pos);
      //   console.log('score ', score);
      if (level === recursiveLevel) {
        validOPositionsInMinimax.push({ pos: i, score });
      }

      // computer
      if (score > newAlpha) {
        newAlpha = score;
        pos = newMinimaxSquares[i].pos;
      }
      tempPos = newMinimaxSquares[i].pos; // end of loop but not enter above if.
      if (newAlpha >= newBeta) break; // beta cut-off
    }
  }

  // console.log('');
  // console.log('>>>>>>> level O: ', level);
  // console.log('beta ', newBeta);
  // console.log('alpha ', newAlpha);
  if (pos === -1) {
    pos = tempPos;
  }
  //   console.log('pos ', pos);

  if (level === recursiveLevel) {
    validOPositionsInMinimax = validOPositionsInMinimax.filter(position => {
      return position.score === newAlpha;
    });
    const resultPosInMinimax = getPosMostAlignWithX(
      validOPositionsInMinimax,
      minimaxSquares
    );
    pos = minimaxSquares[resultPosInMinimax].pos;

    console.log('');
    console.log('>>>>>>> level O: ', level);
    console.log('beta ', newBeta);
    console.log('alpha ', newAlpha);
  }

  return { pos, score: newAlpha };
};

// export default function minimax(
//   xIsNext,
//   depth,
//   minimaxSquares,
//   squares,
//   curMinimaxSquareIndex,
//   curSquareIndex,
//   size
// ) {
//   a += 1;
//   console.log('time ', a);
//   const winner = calculateGameWinnerMinimax(
//     minimaxSquares,
//     curMinimaxSquareIndex
//   );
//   if (winner || isMinimaxSquaresFull(minimaxSquares)) {
//     return getScore(winner, depth);
//   }

//   const newDepth = depth + 1;
//   const moves = [];
//   const turn = xIsNext ? 'X' : 'O';

//   for (let i = 0; i < minimaxSquares.length; i += 1) {
//     if (
//       minimaxSquares[i].value === null &&
//       minimaxSquares[i].pos !== curSquareIndex
//     ) {
//       const newSquares = squares.slice();
//       newSquares[minimaxSquares[i].pos] = turn;
//       const newMinimaxSquares = JSON.parse(JSON.stringify(minimaxSquares));
//       newMinimaxSquares[i].value = turn;

//       let score = minimax(
//         !xIsNext,
//         newDepth,
//         newMinimaxSquares,
//         newSquares,
//         i,
//         newMinimaxSquares[i].pos,
//         size
//       );

//       // score can be an object
//       if (!(typeof score === 'number')) {
//         score = score.score;
//       }

//       // set the values
//       const move = {
//         pos: newMinimaxSquares[i].pos,
//         score
//       };

//       moves.push(move);
//     }
//   }

//   // find the idx with the max
//   let min = 0;
//   let max = 0;
//   // go through the scores, find
//   for (let i = 1; i < moves.length; i += 1) {
//     if (moves[i].score > moves[max].score) {
//       max = i;
//     }
//     if (moves[i].score < moves[min].score) {
//       min = i;
//     }
//   }

//   const result = turn === 'O' ? moves[max] : moves[min];
//   return result;
// }
