import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  Redirect
  // useHistory,
  // useLocation
} from 'react-router-dom';

import Login from '../containers/login';
import Register from '../containers/register';
import Game from '../containers/game';

export default function App({ currentUser, onAuthenticate }) {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute
            currentUser={currentUser}
            onAuthenticate={onAuthenticate}
            path="/home"
          >
            <Game />
          </PrivateRoute>
          {/* <Route path="/game">
            <Game />
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
    this.state = {
      // isAuthenticated: false
    };
  }

  componentDidMount() {
    const { currentUser, onAuthenticate } = this.props;
    const jwt = localStorage.getItem('token');

    if (!currentUser) {
      onAuthenticate(jwt);
    }
  }

  render() {
    const { currentUser, children } = this.props;

    return (
      <Route
        render={({ location }) =>
          currentUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
}
