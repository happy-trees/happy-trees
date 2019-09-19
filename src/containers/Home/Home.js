import React from 'react';
import { connect } from 'react-redux';
import Home from '../../components/homePage/Home';
import { getUserNickname } from '../../selectors/authSelectors';
import PropTypes from 'prop-types';
import { clearGameState } from '../../actions/socketActions';

class HomeContainer extends React.Component {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
    clearGameState: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearGameState();
  }

  render() {
    const { nickname } = this.props;
    return (
      <Home nickname={nickname}/>
    );
  }
}

const mapStateToProps = state => ({
  nickname: getUserNickname(state),
});

const mapDispatchToProps = dispatch => ({
  clearGameState: () => dispatch(clearGameState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
