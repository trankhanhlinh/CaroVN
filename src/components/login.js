import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import Loading from './loadingIcon/loading';
import './form.css';

export default function Login({
  loginUser,
  errorMessage,
  onSubmit,
  oauthFacebook,
  oauthGoogle
}) {
  if (loginUser.username) {
    return <Redirect to="/home" />;
  }

  const responseFacebook = response => {
    // console.log('facebook ', response);
    oauthFacebook(response.accessToken);
  };

  const responseGoogle = response => {
    // console.log('google ', response);
    oauthGoogle(response.accessToken);
  };

  return (
    <Form className="basic-form" onSubmit={e => onSubmit(e)}>
      {loginUser.isPending && <Loading />}
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

      <Form.Group controlId="formBasicLink">
        <Link to="/register">Do not have an account? Register</Link>
      </Form.Group>

      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}

      <Button
        variant="secondary"
        type="submit"
        disabled={!!loginUser.isPending}
      >
        Login
      </Button>

      <FacebookLogin
        appId="528840947905725"
        autoLoad
        textButton="Facebook"
        fields="name, email, picture"
        callback={responseFacebook}
        cssClass="btn btn-primary"
      />

      <GoogleLogin
        clientId="72475427681-3chf7ih6ld8ma5p9h2qruatkr254i1m7.apps.googleusercontent.com"
        render={renderProps => (
          <Button
            variant="danger"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Form>
  );
}
