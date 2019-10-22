import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loading from './loadingIcon/loading';
import './form.css';

function Register({ registerUser, onSubmit }) {
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
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
}

Register.propTypes = {
  registerUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Register;
