import React from 'react';
import { connect } from 'react-redux';
import Home from '../../components/homePage/Home';
import { getUserNickname } from '../../selectors/authSelectors';
import PropTypes from 'prop-types';
import { clearGameState } from '../../actions/socketActions';
import { logoutUser } from '../../actions/authActions';

class HomeContainer extends React.Component {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
    clearGameState: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearGameState();
  }

  onSignOut = () => {
    this.props.logoutUser()
      .then(() => this.props.history.push('/landing'));
  }

  render() {
    const { nickname } = this.props;
    return (
      <Home nickname={nickname} onSignOut={this.onSignOut} />
    );
  }
}

const mapStateToProps = state => ({
  nickname: getUserNickname(state),
});

const mapDispatchToProps = dispatch => ({
  clearGameState: () => dispatch(clearGameState()),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
