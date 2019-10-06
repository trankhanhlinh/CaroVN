import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
  const { value, isWinningSquare, onClick } = props;
  return (
    <button
      type="button"
      style={{
        color: value === 'X' ? 'blue' : 'red',
        background: isWinningSquare ? 'rgba(131, 204, 210, 0.2)' : '#fff',
        border: isWinningSquare ? '1px solid #00a3af' : '1px solid #999'
      }}
      className="square"
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  isWinningSquare: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

Square.defaultProps = {
  value: null
};

export default Square;
