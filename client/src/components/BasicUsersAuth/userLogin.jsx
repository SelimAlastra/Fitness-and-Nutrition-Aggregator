import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import './userLogin.css';
import axios from 'axios';
import Google from './googleLogin.jsx';
import Facebook from './facebookLogin.jsx';

require('dotenv').config({path:'/.env'});

function PopUpLogin(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="loginButton" variant="outline-success" variant="primary" onClick={handleShow}>
      Login
    </Button>
    <div className = "modal-dialog">
    <Modal className="logIn" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LOGIN FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <Login/> </Modal.Body>
    </Modal>
    </div>
  </>
  );

};

const Login = () => {

const history = useHistory();
    
const eye = <FontAwesomeIcon icon={faEye} />;

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Email must be valid')
        .required("No email or username provided."),
    
    password: Yup.string()
        .required("No password provided.")
});

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const formik = useFormik({
  initialValues:{ email: "", password: "" },
  validationSchema: schema,
  onSubmit: (values, actions) => {
    if(values.email && values.password){
      console.log("Logging in", values);
      const newData = {
        email: values.email,
        password: values.password,
      }
      axios.post(`http://localhost:5000/basicUsers/login`, newData)
          .then(res => {
            authenticate(res, () => {
            history.push(`/clientDashboard/${JSON.parse(localStorage.getItem('user'))._id}`) 
            })
          })
          .catch(err => {
            console.log(err)
            if(err.response.data.errors){
                if(err.response.data.errors.includes('User'))
                  actions.setFieldError('email', 'User with that email does not exist. Please register.')
                else
                  actions.setFieldError('password', 'Email and password do not match')     
            }
          })
      actions.setSubmitting(false);
    }
  },
});

return (
<div className="Form">
    {/* {isAuth() ? <Redirect to='/' /> : null} */}
<Form onSubmit={formik.handleSubmit} autoComplete="Off">
  <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
    <Form.Control className="loginInput"
        id="email"
        name="email"
        type="text"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.email && formik.touched.email && "error"}
    />
    {formik.errors.email && formik.touched.email && (
    <div className="input-feedback">{formik.errors.email}</div>
    )}
    <p/>
    <Form.Label hidden={true} htmlFor="password">Password</Form.Label>
    <div className="parent">
    <Form.Control 
        id="password"
        name="password"
        type={passwordShown ? "text" : "password"}
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.password && formik.touched.password && "error"}
    /> <i className="child" onClick={togglePasswordVisiblity}>{eye}</i>
    </div>
    {formik.errors.password && formik.touched.password && (
    <div className="input-feedback">{formik.errors.password}</div>
    )}
    <Link to="/user/password/forget">Forgot Password?</Link>
    <p/>
    <Button className="loginButtonModal" variant="outline-success" type="submit" name="loginBtn" disabled={formik.isSubmitting}>
        Log In
    </Button>
    <p style={{'marginLeft': '140px', 'fontWeight': 'bold'}}> OR </p>
    <Google/>
    <p/>
    <Facebook/>
</Form>
</div>
);
};
  export default PopUpLogin;