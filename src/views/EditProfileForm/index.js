// Dependencies
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import * as authActions from '../../redux/stores/auth/actions';

// View
import View from './EditProfileFormView';

/**
 * Map state to props
 * @returns { object }
 */
export const mapStateToProps = state => ({
  user: state.getIn(['AppState', 'user']),
  response: state.getIn(['AppState', 'response']).toJS(),
});

/**
 * Map dispatch to props
 * @param dispatch - Run the  process to execute in the action
 * @returns { object }
 */
export const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
