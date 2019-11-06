import { connect } from 'react-redux';
import Home from '../components/home';
import { logout, selectGameMode } from '../actions';

const handleSelectGameMode = (mode, dispatch) => {
  localStorage.setItem('mode', mode);
  dispatch(selectGameMode(mode));
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  handleSelectGameMode: mode => handleSelectGameMode(mode, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
