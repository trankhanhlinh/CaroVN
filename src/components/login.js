import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Loading from './loadingIcon/loading';
import './form.css';

export default function Login({ loginUser, onSubmit }) {
  if (loginUser.username && !loginUser.isPending) {
    return <Redirect to="/home" />;
  }
  return (
    <Form className="basic-form" onSubmit={e => onSubmit(e)}>
      {loginUser.username && loginUser.isPending && <Loading />}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
