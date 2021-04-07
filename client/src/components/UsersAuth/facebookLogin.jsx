import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons' 
import './facebookLogin.css';
import { baseUrl } from '../../api/index';

const Facebook = (client) => {

  const isClient = client.isClient;

  const history = useHistory();

  const icon = <FontAwesomeIcon icon={faFacebookF} />

  const sendFacebookToken = (userID, accessToken) => {
    if(isClient == "true"){
      axios
        .post(`${baseUrl}/basicUsers/facebooklogin`, {
          userID,
          accessToken
        })
        .then(res => {
          console.log(res.data);
          informParent(res);
        })
        .catch(error => {
          window.location.reload();
          console.log('FACEBOOK SIGN IN ERROR', error.response);
        });
    }
    else{
      axios
      .post(`${baseUrl}/professionalUsers/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        window.location.reload();
        console.log('FACEBOOK SIGN IN ERROR', error.response);
      });
    }
  };

  const informParent = response => {
    authenticate(response, () => {
      isAuth()
      if(isClient == "true"){
        if(response.data.isNew){
          history.push(`/user/quiz/${JSON.parse(localStorage.getItem('user'))._id}`)
        }
        else{
          history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
        }
      }
      else{
        if(response.data.isNew){
          history.push(`/professional/quiz/${JSON.parse(localStorage.getItem('user'))._id}`)
        }
        else{
          history.push(`/professionalDashboard/${JSON.parse(localStorage.getItem('user'))._id}`);
        }
      }
    });
  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };  

  return (
    
    <FacebookLogin
        appId = '456088625578082'
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
        <button
          onClick = {renderProps.onClick}
          disabled = {renderProps.disabled}
          type="submit"
          className="FacebookLogin"
        >
         <div className=' p-2 rounded-full '>
          <i style={{'marginLeft': '5px'}}>{icon}</i>
         </div>
          <span style={{'marginTop': '8px', 'marginLeft': '8px'}}>Sign In with Facebook</span>
        </button>
      )}
    />
  );
};

export default Facebook;