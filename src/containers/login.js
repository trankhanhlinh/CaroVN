import { connect } from 'react-redux';
import Login from '../components/login';
import { login, authenticate } from '../actions';

const mapStateToProps = state => ({
  loginUser: state.users.currentUser
});

const handleOnSubmit = (event, stateProps, dispatchProps) => {
  // const { loginUser } = stateProps;
  event.preventDefault();

  const form = event.target;
  const user = {
    USERNAME: form.elements.username.value,
    PASSWORD: form.elements.password.value
  };

  dispatchProps.login(user);
  // if (loginUser.jwtToken) {
  //   dispatchProps.authenticate(loginUser.jwtToken);
  // }
};

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  authenticate: jwt => dispatch(authenticate(jwt))
});

const mergeProps = (stateProps, dispatchProps) => {
  const onSubmit = e => handleOnSubmit(e, stateProps, dispatchProps);

  return {
    ...stateProps,
    ...dispatchProps,
    onSubmit
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Login);
