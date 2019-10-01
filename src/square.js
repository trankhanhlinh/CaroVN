import React from 'react';

function Square(props) {
  const { value, isWinningSquare } = props;
  return (
    <button
      type="button"
      style={{
        color: value === 'X' ? 'blue' : 'red',
        background: isWinningSquare ? 'rgba(131, 204, 210, 0.2)' : '#fff',
        border: isWinningSquare ? '1px solid #00a3af' : '1px solid #999'
      }}
      className="square"
      onClick={() => props.onClick()}
    >
      {value}
    </button>
  );
}

export default Square;
