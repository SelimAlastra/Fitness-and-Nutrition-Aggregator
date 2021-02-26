import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import './facebook_login.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookF} from "@fortawesome/free-brands-svg-icons";
import axios from 'axios';


const icon = <FontAwesomeIcon icon={faFacebookF}/>

const LoginButton = ({facebookResponse}) => (
  <FacebookLoginWithButton
    appId="456088625578082"
    textButton="&nbsp;&nbsp;&nbsp;Continue with Facebook"
    cssClass="FacebookLogin"
    // autoLoad
    fields="name,email,picture"
    callback={facebookResponse}
    icon={icon}/>
  )


const UserScreen = ({user}) => (
  <>
    <h1>Welcome {user.name}!</h1>
    <p>{ user.email }</p>
    <img src={user.picture.data.url} height={user.picture.height} width={user.picture.width} alt="avatar"/>
  </>
)

class Facebook extends React.Component {
  state = {user:false}
  facebookResponse = (response) => { console.log( response ); this.setState( {...this.state, user: response } ) 
  axios.post('http://localhost:3001', response)
}

  render() {
    return (
      <div style={{ margin: "auto", textAlign: "center", paddingTop: "2em" }}>
        { this.state.user ? <UserScreen user={this.state.user}/> :
          <LoginButton facebookResponse={this.facebookResponse}/>
        }
      </div>
    )
  }
}

export default Facebook;