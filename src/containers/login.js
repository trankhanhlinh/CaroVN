import { connect } from 'react-redux';
import Login from '../components/login';
import { login } from '../actions';

const mapStateToProps = state => ({
  loginUser: state.users.currentUser
});

const handleOnSubmit = (event, dispatch) => {
  event.preventDefault();

  const form = event.target;
  const user = {
    USERNAME: form.elements.username.value,
    PASSWORD: form.elements.password.value
  };

  dispatch(login(user));
};

const mapDispatchToProps = dispatch => ({
  onSubmit: e => handleOnSubmit(e, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
