import { connect } from 'react-redux';
import App from '../components/app';
import { authenticate } from '../actions';

// const mapStateToProps = state => {

// };

const mapDispatchToProps = dispatch => ({
  onAuthenticate: jwt => dispatch(authenticate(jwt))
});

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(App);
