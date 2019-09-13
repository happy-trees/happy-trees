import { connect } from 'react-redux';
import LandingPage from '../../components/landingPage/LandingPage';
import { loginUser } from '../../actions/authActions';

const mapDispatchToProps = dispatch => ({
  handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(
      event.target[0].value
    ));
    
  }
});

export default connect(
  null,
  mapDispatchToProps
)(LandingPage);

