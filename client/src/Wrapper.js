import { Redirect } from "react-router";
import ClientDashboard from "./ClientDashboard";

const Wrapper = (props, {...rest}) => {
    const MyComponent = props.component;

    if(props.match.params.id === JSON.parse(localStorage.getItem('user'))._id)
        return <MyComponent {...props} />
    else
        return <Redirect to={{ pathname: '/', state: {from: props.location} }} />
}

export default Wrapper;