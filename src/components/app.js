import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from '../containers/login';
import Register from '../containers/register';
import Game from '../containers/game';
import PersonalPage from '../containers/personalPage';
import Home from '../containers/home';

export default function App({ currentUser, onAuthenticate }) {
  const jwt = localStorage.getItem('access_token');

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {jwt ? (
            <Route path="/login">
              <Redirect to="/home" />;
            </Route>
          ) : (
            <Route path="/login">
              <Login />
            </Route>
          )}
          {jwt ? (
            <Route path="/register">
              <Redirect to="/home" />;
            </Route>
          ) : (
            <Route path="/register">
              <Register />
            </Route>
          )}
          <PrivateRoute
            path="/game"
            currentUser={currentUser}
            onAuthenticate={onAuthenticate}
          >
            <Game />
          </PrivateRoute>
          <PrivateRoute
            path="/me"
            currentUser={currentUser}
            onAuthenticate={onAuthenticate}
          >
            <PersonalPage />
          </PrivateRoute>
          {/* <Route path="/login">
            <Login />
          </Route> */}
          {/* <Route path="/register">
            <Register />
          </Route> */}
          <PrivateRoute
            path="/home"
            currentUser={currentUser}
            onAuthenticate={onAuthenticate}
          >
            <Home />
          </PrivateRoute>
          {jwt ? (
            <Route path="/">
              <Redirect to="/home" />;
            </Route>
          ) : (
            <Route path="/">
              <Redirect to="/login" />;
            </Route>
          )}
          {/* <Route path="/">
            <Redirect to="/login" />;
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { currentUser, onAuthenticate } = this.props;
    const jwt = localStorage.getItem('access_token');

    if (!currentUser.username && jwt) {
      onAuthenticate(jwt);
    }
  }

  render() {
    const { children, ...rest } = this.props;
    const jwt = localStorage.getItem('access_token');

    return (
      <Route
        {...rest}
        render={() => (jwt ? children : <Redirect to="/login" />)}
      />
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    username: PropTypes.string,
    password: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onAuthenticate: PropTypes.func.isRequired
};
