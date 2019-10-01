import React from 'react';

function Square(props) {
  return (
    <button
      style={{
        color: props.value === 'X' ? 'blue' : 'red',
        background: props.isWinningSquare ? 'rgba(131, 204, 210, 0.2)' : '#fff',
        border: props.isWinningSquare ? '1px solid #00a3af' : '1px solid #999'
      }}
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export default Square;
