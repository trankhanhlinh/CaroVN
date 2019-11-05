import { connect } from 'react-redux';
import PersonalPage from '../components/personalPage';
import {
  logout,
  updateUserInfo,
  updateUserInfoInCludingAvatar
} from '../actions';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const handleUpdateUser = (event, dispatch) => {
  event.preventDefault();
  const input = document.querySelector('input[type="file"]');
  const form = event.target;
  const updatedUser = {
    USERNAME: form.elements.username.value,
    FIRSTNAME: form.elements.firstName.value,
    LASTNAME: form.elements.lastName.value,
    EMAIL: form.elements.email.value,
    AVATAR: input.files[0]
  };

  console.log(updatedUser);

  if (updatedUser.AVATAR) {
    dispatch(updateUserInfoInCludingAvatar(updatedUser));
  } else {
    dispatch(updateUserInfo(updatedUser));
  }
};

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  updateUserInfo: e => handleUpdateUser(e, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalPage);
