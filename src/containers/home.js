import { connect } from 'react-redux';
import Home from '../components/home';
import { logout, selectGameMode } from '../actions';

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logout()),
  handleSelectGameMode: mode => dispatch(selectGameMode(mode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
