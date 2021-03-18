import ProfRegister from './components/ProfessionalUsersAuth/professionalRegister.jsx';
import ProfLogin from './components/ProfessionalUsersAuth/professionalLogin.jsx';
import './ProfessionalLoginRegister.css'

const ProfPage = () => {
    return (
        <div className="backgroundLoginRegister">
            <img className="backgroundJPG"
                src="https://static.onecms.io/wp-content/uploads/sites/35/2010/07/28170650/fb-interval-training-workouts.jpg" />
            <div className="loginRegisterProf">
                <ProfLogin className="loginButton" />
                <ProfRegister className="registerButton" />
            </div>
        </div>
    )
}

export default ProfPage;