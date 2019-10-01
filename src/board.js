import React from 'react';
import Square from './square.js';

class Board extends React.Component {
  renderSquare(i) {
    let result = this.props.winningSquares.find(index => {
      return index === i;
    });

    return (
      <Square
        isWinningSquare={result ? true : false}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard = () => {
    let rows = [];
    let squares;
    let size = this.props.size;
    for (let i = 0; i < size; i++) {
      squares = [];
      for (let j = i * size; j < size + i * size; j++) {
        squares.push(this.renderSquare(j));
      }

      rows.push(<div className="board-row">{squares}</div>);
    }

    return rows;
  };

  render() {
    return <div className="board">{this.createBoard()}</div>;
  }
}

export default Board;
