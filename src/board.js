import React from 'react';
import Square from './square';

class Board extends React.Component {
  createBoard = () => {
    const rows = [];
    let squares;
    const { size } = this.props;
    for (let i = 0; i < size; i += 1) {
      squares = [];
      for (let j = i * size; j < size + i * size; j += 1) {
        squares.push(this.renderSquare(j));
      }

      rows.push(<div className="board-row">{squares}</div>);
    }

    return rows;
  };

  renderSquare(i) {
    const { winningSquares, squares, onClick } = this.props;
    const result = winningSquares.find(index => {
      return index === i;
    });

    return (
      <Square
        isWinningSquare={!!result}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  }

  render() {
    return <div className="board">{this.createBoard()}</div>;
  }
}

export default Board;
