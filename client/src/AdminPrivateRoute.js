import { Redirect, Route } from "react-router";



const AdminPrivateRoute = ({component: Component, ...rest}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    let isLogged = false;

    if (user) {
        if (user.type == 'admin') {
            isLogged = true;
        }
    }

    return (
        <Route
            {...rest}
            render={props =>
            isLogged ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/', state: {from: props.location} }} />
            )
        }
        />
    )

};


export default AdminPrivateRoute;