import { connect } from 'react-redux';
import Home from '../../components/homePage/Home';
import { getUserNickname, getUserAvatar } from '../../selectors/authSelectors';

const mapStateToProps = state => ({
  nickname: getUserNickname(state),
  avatar: getUserAvatar(state)
});

export default connect(
  mapStateToProps,
  null
)(Home);
