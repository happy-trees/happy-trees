import { connect } from 'react-redux';
import Home from '../../components/homePage/Home';
import { getUserNickname } from '../../selectors/authSelectors';

const mapStateToProps = state => ({
  nickname: getUserNickname(state)
});

export default connect(
  mapStateToProps,
  null
)(Home);
