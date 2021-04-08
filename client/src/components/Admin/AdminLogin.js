import { useFormik } from "formik";
import { React } from "react";
import reactDom from "react-dom";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, Container, Button } from "react-bootstrap";
import axios from 'axios';
import { authenticate } from '../../actions/userAuth.js';
import * as Yup from "yup";
import { baseUrl } from "../../api/index.js";


//This is the style of the login box
const loginStyle = {
    marginTop: "18%",
    maxWidth: "40%",
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
        .required("Username is required."),
    
    password: Yup.string()
        .required("Password is required.")
});

// The login form. It controls how the data is managed, and it returns the form
// that will be displayed.
const Login = () => {


    const history = useHistory();

    const Formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: adminSchema,
        onSubmit: (values, actions) => {
          if(values.username && values.password){
            const newData = {
                username: values.username,
                password: values.password,
            }
            axios.post(`${baseUrl}/admins/login`, newData)
                .then(res => {
                  authenticate(res, () => {
                  history.push(`/admin/basicusers`) 
                  })
                })
                .catch(err => {
                  if(err.data){
                    actions.setFieldError('Not an Admin');    
                  }
                })
            actions.setSubmitting(false);
          }
        },
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
            {Formik.errors.username && Formik.touched.username && (
            <div style={{color: "red"}} className="input-feedback">{Formik.errors.username}</div>
            ) }
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
            {Formik.errors.password && Formik.touched.password && (
            <div style={{color: "red"}} className="input-feedback">{Formik.errors.password}</div>
            )}
            </Form.Group>

            <Button variant="primary" type="submit">Login</Button>
        </Form>
    )

}



export default AdminLogin;