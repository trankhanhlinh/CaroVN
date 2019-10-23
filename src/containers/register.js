import { connect } from 'react-redux';
import Register from '../components/register';
import { register } from '../actions';

let registerUsername = null;

const mapStateToProps = state => {
  return {
    registerUser: !registerUsername
      ? { isPending: false, username: registerUsername }
      : state.newUsers[registerUsername]
  };
};

const handleOnSubmit = (event, dispatch) => {
  event.preventDefault();

  const form = event.target;
  const newUser = {
    USERNAME: form.elements.username.value,
    PASSWORD: form.elements.password.value
  };

  registerUsername = newUser.USERNAME;
  dispatch(register(newUser));
};

const mapDispatchToProps = dispatch => ({
  onSubmit: e => handleOnSubmit(e, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
