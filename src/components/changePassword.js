import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import Header from './header';
import Loading from './loadingIcon/loading';
import './form.css';

function ChangePassword({
  currentUser,
  handleLogout,
  hanldeUpdateUserPassword
}) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    hanldeUpdateUserPassword(event);
  };

  //   const handleChange = event => {
  //     const { name, value } = event.target;
  //     console.log(name, value);
  //   };

  return (
    <>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Form
        className="basic-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        {currentUser.isPending && <Loading />}
        <Form.Group controlId="formBasicCurrentPassword">
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Current password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicNewPassword">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            required
          />
          <Form.Control.Feedback type="invalid">
            New password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="secondary"
          type="submit"
          disabled={!!currentUser.isPending}
        >
          Update
        </Button>
      </Form>
    </>
  );
}

ChangePassword.propTypes = {
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
  hanldeUpdateUserPassword: PropTypes.func.isRequired
};

export default ChangePassword;
