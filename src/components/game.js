import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Button } from 'react-bootstrap';
import './game.css';
import Board from './board';

function Game({
  history,
  stepNumber,
  xIsNext,
  sortAsc,
  handleClick,
  jumpTo,
  calculateWinner,
  sort,
  currentUser,
  handleLogout
}) {
  const size = 20;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares, current.pos, size);
  const sortedHistory = sortAsc ? history : history.slice().reverse();
  const moves = sortedHistory.map((step, move) => {
    const replayIndex = sortAsc ? 0 : sortedHistory.length - 1;
    if (move !== replayIndex) {
      const properMove = sortAsc ? move : history.length - 1 - move;
      const desc = `Go to move #${properMove} (${parseInt(
        step.pos / size,
        10
      )},${step.pos % size})`;
      return (
        <li key={properMove}>
          <button
            type="button"
            className="step-button"
            onClick={e => jumpTo(e, properMove)}
          >
            {desc}
          </button>
        </li>
      );
    }
    return null;
  });

  let status;
  if (winner) {
    status = `Winner is ${winner.player}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-text">
            Hello, {currentUser.username}
          </Navbar.Text>
          <Button
            variant="light"
            size="sm"
            className="navbar-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares={winner ? winner.winningSquares : []}
            size={size}
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status" style={{ color: winner ? 'red' : '#00a3af' }}>
            {status}
          </div>
          <button
            type="button"
            className="replay-button"
            onClick={e => jumpTo(e, 0)}
          >
            Replay
          </button>
          {history.length > 2 ? (
            <button
              type="button"
              className="sort-button"
              onClick={() => sort()}
            >
              {sortAsc ? 'descending sort' : 'ascending sort'}
            </button>
          ) : null}
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

Game.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.arrayOf(PropTypes.string).isRequired,
      pos: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  stepNumber: PropTypes.number.isRequired,
  xIsNext: PropTypes.bool.isRequired,
  sortAsc: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  jumpTo: PropTypes.func.isRequired,
  calculateWinner: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Game;
