import React from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons' 
import './googleLogin.css';

const Google = () => {
    const history = useHistory()

    const icon = <FontAwesomeIcon icon={faGoogle} />

const sendGoogleToken = tokenId => {
  axios
    .post(`http://localhost:5000/basicUsers/googlelogin`, {
      idToken: tokenId
    })
    .then(res => {
      console.log(res.data);
      informParent(res);
    })
    .catch(error => {
      console.log('GOOGLE SIGN IN ERROR', error.response);
    });
};

const informParent = response => {
  authenticate(response, () => {
    isAuth() 
    history.push('/user');
  });
};

const responseGoogle = response => {
  console.log(response);
  sendGoogleToken(response.tokenId);
};
    return (
        <GoogleLogin
          clientId='490602914779-7kv3ltvaluhh4ca4f3p7skuhv065dn6a.apps.googleusercontent.com'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className='GoogleLogin'
              >
              <div className=' p-2 rounded-full '>
                <i style={{'marginLeft': '5px'}}>{icon}</i>
              </div>
              <span style={{'marginTop': '8px', 'marginLeft': '8px' }}>Sign In with Google</span>
            </button>
          )}
          cookiePolicy={'single_host_origin'}
        />
    );
  };

  export default Google;