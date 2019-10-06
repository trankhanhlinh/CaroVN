import React from 'react';
import PropTypes from 'prop-types';
import Square from './square';

function Board(props) {
  const { winningSquares, squares, onClick, size } = props;

  const renderSquare = i => {
    let result = false;
    for (let j = 0; j < winningSquares.length; j += 1) {
      if (winningSquares[j] === i) {
        result = true;
      }
    }

    return (
      <Square
        isWinningSquare={result}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  const createBoard = () => {
    const rows = [];
    let mySquares;
    for (let i = 0; i < size; i += 1) {
      mySquares = [];
      for (let j = i * size; j < size + i * size; j += 1) {
        mySquares.push(renderSquare(j));
      }

      rows.push(<div className="board-row">{mySquares}</div>);
    }

    return rows;
  };

  return <div className="board">{createBoard()}</div>;
}

Board.propTypes = {
  winningSquares: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired
};

export default Board;
