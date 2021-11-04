import {API} from '.././../config/API';
import _ from 'lodash';

// Endpoints
const {auth: authEndpoints, user: userEndpoints} = API;

class AuthService {
  /**
   * Get user credentials data
   * @return { Object } - User credentials data.
   */
  getUserCredentialsData = async data => {
    const credentialsResult = await authEndpoints.login();
    const accessValidation = _.isEqual(credentialsResult, data);
    const result = accessValidation
      ? {status: 'Access granted', granted: accessValidation}
      : {status: 'Access denied', granted: accessValidation};
    return result;
  };

  /**
   * Get profiles data
   * @return { Object } - Profiles data.
   */
  getProfilesData = async () => {
    return userEndpoints.getProfiles();
  };

  /**
   * Sign up user data
   * @return { Object } - User data.
   */
  signUpData = async data => {
    const {email, firstName, lastName, password} = data;
    const credentials = {
      email,
      password,
    };
    const profile = {
      img: 'https://esprm.eu/wp-content/themes/Esprm/images/default-avatar-3.png',
      email,
      firstName,
      lastName,
    };
    authEndpoints.setCredentials(credentials);
    return authEndpoints.signUp(profile);
  };

  /**
   * Update user data
   * @return { Object } - User data.
   */
  updateUserData = async data => {
    return userEndpoints.update(data);
  };
}

export default new AuthService();
