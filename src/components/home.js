import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './header';
import './game.css';

function Home({ currentUser, handleLogout, handleSelectGameMode }) {
  return (
    <>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Welcome to Omy&apos;s Caro</Card.Title>
          <Card.Text>Let&apos;s play a game to relax and have fun!</Card.Text>
          <Link to="/game">
            <Button
              variant="primary"
              onClick={() => handleSelectGameMode('computer')}
            >
              Play with computer
            </Button>
          </Link>
          <Link to="/game">
            <Button
              variant="warning"
              onClick={() => handleSelectGameMode('friend')}
            >
              Play with someone
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

Home.propTypes = {
  currentUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string,
    password: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleSelectGameMode: PropTypes.func.isRequired
};

export default Home;
