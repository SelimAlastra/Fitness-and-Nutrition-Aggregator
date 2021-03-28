import Login from './components/UsersAuth/loginModal.jsx';
import Register from './components/UsersAuth/registerModal.jsx';
import './LoginRegisterPage.css';

const UserPage = () => {
    return (
        <div className="backgroundLoginRegister">
            <img className="backgroundJPG"
                src="https://static.onecms.io/wp-content/uploads/sites/35/2010/07/28170650/fb-interval-training-workouts.jpg" />
            <div className="loginRegister">
                <Login className="loginButton" />
                <Register className="registerButton" />
            </div>
        </div>
    )
}

export default UserPage;