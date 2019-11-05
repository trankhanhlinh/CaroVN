import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Loading from './loadingIcon/loading';
import './form.css';

function Register({ registerUser, errorMessage, onSubmit }) {
  if (registerUser.username && !registerUser.isPending) {
    return <Redirect to="/login" />;
  }
  return (
    <Form className="basic-form" onSubmit={e => onSubmit(e)}>
      {registerUser.username && registerUser.isPending && <Loading />}
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          name="username"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Group>

      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}

      <Button
        variant="primary"
        type="submit"
        disabled={!!(registerUser.username && registerUser.isPending)}
      >
        Register
      </Button>
    </Form>
  );
}

Register.propTypes = {
  registerUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Register;
