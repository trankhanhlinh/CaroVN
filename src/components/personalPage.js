import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Header from './header';
import Loading from './loadingIcon/loading';
import './form.css';

function PersonalPage({ currentUser, handleLogout, updateUserInfo }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    updateUserInfo(event);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
  };

  return (
    <>
      <Header currentUser={currentUser} handleLogout={handleLogout} />
      <Form
        className="basic-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {currentUser.isPending && <Loading />}
        <Form.Group controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <div className="avatar">
            <Image src={currentUser.avatar} roundedCircle />
          </div>
          <Form.Control
            type="file"
            name="avatar"
            multiple
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            defaultValue={currentUser.username}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            defaultValue={currentUser.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formBasicFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              defaultValue={currentUser.firstName}
              required
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              First name is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="formBasicLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              defaultValue={currentUser.lastName}
              required
            />
            <Form.Control.Feedback type="invalid">
              Last name is required
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

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

PersonalPage.propTypes = {
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
  updateUserInfo: PropTypes.func.isRequired
};

export default PersonalPage;
