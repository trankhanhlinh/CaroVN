import { connect } from 'react-redux';
import Login from '../components/login';
import { login } from '../actions';

let loginUsername = null;

const mapStateToProps = state => {
  return {
    loginUser: !loginUsername
      ? { isPending: false, username: loginUsername }
      : state.users[loginUsername]
  };
};

const handleOnSubmit = (event, dispatch) => {
  event.preventDefault();

  const form = event.target;
  const user = {
    USERNAME: form.elements.username.value,
    PASSWORD: form.elements.password.value
  };

  loginUsername = user.USERNAME;
  dispatch(login(user));
};

const mapDispatchToProps = dispatch => ({
  onSubmit: e => handleOnSubmit(e, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
