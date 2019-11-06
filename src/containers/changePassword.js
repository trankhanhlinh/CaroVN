import { connect } from 'react-redux';
import ChangePassword from '../components/changePassword';
import { logout, updateUserPassword } from '../actions';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const handleUpdateUser = (event, stateProps, dispatchProps) => {
  event.preventDefault();
  const form = event.target;
  const updatedUser = {
    USERNAME: stateProps.currentUser.username,
    CUR_PASSWORD: form.elements.currentPassword.value,
    NEW_PASSWORD: form.elements.newPassword.value
  };

  console.log('update user password ', updatedUser);

  dispatchProps.updateUserPassword(updatedUser);
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  updateUserPassword: updatedUser => dispatch(updateUserPassword(updatedUser))
});

const mergeProps = (stateProps, dispatchProps) => {
  const handleLogout = () => dispatchProps.logout();
  const hanldeUpdateUserPassword = e =>
    handleUpdateUser(e, stateProps, dispatchProps);

  return {
    ...stateProps,
    ...dispatchProps,
    handleLogout,
    hanldeUpdateUserPassword
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChangePassword);
