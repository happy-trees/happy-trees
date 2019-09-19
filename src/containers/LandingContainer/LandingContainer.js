import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LandingPage from '../../components/landingPage/LandingPage';
import { loginUser, verifyUser } from '../../actions/authActions';
import { getUserId, getUserError } from '../../selectors/authSelectors';

class LandingContainer extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    verifyUser: PropTypes.func.isRequired
  }

  state = {
    nickname: '',
  }

  componentDidMount() {
    this.props.verifyUser();
  }

  componentDidUpdate(prevState, prevProps) {
    const { error, userId } = this.props;
    if(prevProps !== this.props) {
      if(!error && userId) {
        this.props.history.push('/');
      }
    }
  }

  handleUpdate = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { handleSubmit } = this.props;
    const { nickname } = this.state;
    return (
      <LandingPage 
        handleSubmit={(e) => handleSubmit(e, nickname)} 
        nickname={nickname} 
        handleUpdate={this.handleUpdate}
      />
    );
  }
}

const mapStateToProps = state => ({
  userId: getUserId(state),
  error: getUserError(state)
});

const mapDispatchToProps = dispatch => ({
  handleSubmit(event, nickname) {
    event.preventDefault();
    dispatch(loginUser(nickname));
  },
  verifyUser: () => dispatch(verifyUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer);

