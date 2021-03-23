import { Redirect, Route } from "react-router";



const PrivateRoute = ({component: Component, componentToRender: componentToRender, userType, ...rest}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    let isLogged = false;
    console.log(rest);

    if (user) {
        if (user.type == userType) {
            isLogged = true;
        }
    }

    return (
        <Route
            {...rest}
            render={props =>
            isLogged ? (
                <Component {...props} component={componentToRender}/>
            ) : (
                <Redirect to={{ pathname: '/', state: {from: props.location} }} />
            )
        }
        />
    )

};


export default PrivateRoute;