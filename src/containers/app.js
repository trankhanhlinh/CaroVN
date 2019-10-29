import { connect } from 'react-redux';
import App from '../components/app';
import { authenticate } from '../actions';

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  onAuthenticate: jwt => dispatch(authenticate(jwt))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
