import React from 'react';
import PropTypes from 'prop-types';
import { getUserId } from '../selectors/authSelectors';
import { connect } from 'react-redux';

export const WithSession = Component => {
  class WithSession extends React.Component {
    static propTypes = {
      userId: PropTypes.string,
      history: PropTypes.object.isRequired
    }

    componentDidMount() {
      if(!this.props.userId) {
        this.props.history.replace('/landing');
      }
    }

    render() {
      if(!this.props.userId) return null;
      return <Component {...this.props}/>;
    }
  }

  const mapStateToProps = state => ({
    userId: getUserId(state)
  });

  return connect(mapStateToProps)(WithSession);
};
