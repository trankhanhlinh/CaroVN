import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './header';
import './game.css';

function Home({ currentUser, handleLogout }) {
  return (
    <>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <div>Welcome home</div>
      <Link to="/game">
        <Button variant="warning" size="sm">
          Play game!
        </Button>
      </Link>
    </>
  );
}

Home.propTypes = {
  currentUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Home;
