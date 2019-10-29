import { connect } from 'react-redux';
import Login from '../components/login';
import { login, oauthFacebook, oauthGoogle } from '../actions';

const mapStateToProps = state => ({
  loginUser: state.auth.currentUser,
  errorMessage: state.auth.errorMessage
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
  onSubmit: e => handleOnSubmit(e, dispatch),
  oauthFacebook: accessToken => dispatch(oauthFacebook(accessToken)),
  oauthGoogle: accessToken => dispatch(oauthGoogle(accessToken))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
