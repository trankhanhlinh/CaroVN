import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, DropdownButton, Dropdown } from 'react-bootstrap';
import Loading from './loadingIcon/loading';

function Header({ currentUser, handleLogout }) {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Link to="/home">
        <Navbar.Brand>Omy&apos;s Caro</Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {currentUser.username ? (
            <DropdownButton
              size="sm"
              variant="secondary"
              alignRight
              title={`Hello, ${currentUser.username}`}
              id="dropdown-menu-align-right"
            >
              <Dropdown.Item eventKey="1">Personal Page</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Loading />
          )}
        </Navbar.Text>

        {/* <Button
          variant="light"
          size="sm"
          className="navbar-btn"
          onClick={handleLogout}
        >
          Logout
        </Button> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  currentUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string
  }).isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default Header;
