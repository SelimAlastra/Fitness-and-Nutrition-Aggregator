import { withFormik, useFormik } from "formik";
import { React } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import * as Yup from "yup";


const loginStyle = {
    margin: "33px auto 36px",
    maxWidth: "550px",
    padding: "35px",
};

const AdminLogin = () => (
    <Container className="border border-secondary" style={loginStyle}>
    <Login />
    </Container>
);

const adminSchema = Yup.object().shape({
    username: Yup.string()
        .required("Required"),
    
    password: Yup.string()
        .required("Required")
});

const Login = () => {

    const Formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: adminSchema,
        onSubmit(values) {
            console.log("Logging in details: ", values)
        }
    });

    return(
        <Form onSubmit={Formik.handleSubmit}>
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