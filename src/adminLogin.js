import { withFormik, useFormik } from "formik";
import { React } from "react";
import reactDom from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import * as Yup from "yup";

//This is the style of the login box
const loginStyle = {
    margin: "33px auto 36px",
    maxWidth: "550px",
    padding: "35px",
};

//This the the main page it has the main container and the login box.
const AdminLogin = () => (
    <Container className="border border-secondary" style={loginStyle}>
    <Login />
    </Container>
);

//A schema to make sure that all entered details' requirements are met
const adminSchema = Yup.object().shape({
    username: Yup.string()
        .required(),
    
    password: Yup.string()
        .required()
});

// The login form. It controls how the data is managed, and it returns the form
// that will be displayed.
const Login = () => {


    const Formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: adminSchema,
        onSubmit(values) {
            console.log("Log in details: ", values);
        }
    });

    return(
        <Form onSubmit={Formik.handleSubmit} >
            <Form.Group>
            <Form.Label>Admin Username</Form.Label>
            <Form.Control
                id="username"
                name="username"
                type="text"
                placeholder="Enter Username"
                value={Formik.values.username}
                onChange={Formik.handleChange}
            />
            </Form.Group>

            <Form.Group>
            <Form.Label>Admin Password</Form.Label>
            <Form.Control
                id="password"
                name="password"
                type="password" 
                placeholder="Password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
            />
            </Form.Group>

            <Button variant="primary" type="submit">Login</Button>
        </Form>
    )

}



export default AdminLogin;