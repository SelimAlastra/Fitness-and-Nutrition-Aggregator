import './UserInfo.css'

function UserInfo({user}) {
    if (user !== undefined && user !== null) {
        return (
            <div>
                <div className="homePageProfileInfo">
                    <h2 className="homePageClientName">Welcome back {user.name} !</h2>
                </div>
            </div>
        );
    } else {
        return (<div>Sorry, can't find what your looking for!</div>);
    }
}

export default UserInfo;

