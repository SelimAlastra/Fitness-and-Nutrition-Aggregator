import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticate, isAuth } from '../../actions/userAuth.js';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import './userRegister.css';
import Google from './googleLogin.jsx';
import Facebook from './facebookLogin.jsx';
import { useHistory } from 'react-router-dom';

function PopUpSignUp(){
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
return(
  <>
  <Button className="registerButton" onClick={handleShow}>
    Create an account
  </Button>

  <Modal className="signUp" show={show} onHide={handleClose}>
    
    <Modal.Header closeButton>
      <Modal.Title >REGISTRATION FORM</Modal.Title>
    </Modal.Header>
    <Modal.Body> <Register/> </Modal.Body>
  </Modal>
</>
);
};

const Register = (props) => {

const history = useHistory();

const eye = <FontAwesomeIcon icon={faEye} />;

const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
  };
      


const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be valid.")
        .required("No email provided."),
    username: Yup.string()
        .min(3, "Username is too short - should be 3 chars minimum.")
        .max(30, "Username is too long - should be 30 chars maximum.")
        .matches(/^[a-zA-Z0-9]*$/, "Username should not contain space or special characters.")
        .required("No username provided."),
    name: Yup.string()
        .required("No name provided."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Password should not contain blank space."),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match.")
        .required("Required.")
});

const formik = useFormik({
    initialValues:{ email: "", username: "", password: "", retypePassword: "", name: ""},
    validationSchema: schema,
    onSubmit: (values, actions) => {
      setTimeout(() => {
        console.log("Signing Up", values);
        const newData = {
          email: values.email,
          username: values.username,
          password: values.password,
          name: values.name,
        }
        axios
          .post(`http://localhost:5000/basicUsers/register`, newData)
          .then(res => {
            authenticate(res, () => {
            history.push(`/userQuiz/${JSON.parse(localStorage.getItem('user')).username}-${JSON.parse(localStorage.getItem('user'))._id}`)
            })
          })
          .catch(err => {
                      if(err.response.data.errors){
                        console.log(err.response.data.errors)
                        if(err.response.data.errors.includes('Email'))
                          actions.setFieldError('email', 'Email already in use')
                        else
                          actions.setFieldError('username', 'Username already in use')
                      }  
                    })
        actions.setSubmitting(false);
      }, 500);
    },
});

  return (
      <div>
        {/* {isAuth() ? <Redirect to='/' /> : null} */}
      
    <Form autoComplete="off" onSubmit={formik.handleSubmit}>
    <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
      <Form.Control
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
      <div style={{color: "red"}} className="input-feedback">{formik.errors.email}</div>
      ) }
      <p/>

      <Form.Label hidden = {true} htmlFor="name">Name</Form.Label>
      <Form.Control
          id="name"
          name="name"
          type="text"
          placeholder="Insert your name here"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.name && formik.touched.name && "error"}
      />
      {formik.errors.name && formik.touched.name && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.name}</div>
      )}
      <p/>    
  
    <Form.Label hidden = {true} htmlFor="username">Username</Form.Label>
      <Form.Control
          id="username"
          name="username"
          type="text"
          placeholder="Create your username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.username && formik.touched.username && "error"}
      />
      {formik.errors.username && formik.touched.username && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.username}</div>
      )}
      <p/>
  
    <Form.Label hidden = {true} htmlFor="password">Password</Form.Label> 
      <div className="parent1">
      <Form.Control
          id="password"
          name="password"
          type={passwordShown ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.password && formik.touched.password && "error"}
      /> 
      <i className="child1" onClick={togglePasswordVisibility}>{eye}</i>
      </div>
      {formik.errors.password && formik.touched.password && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
      )}
      <p/>
    
    <Form.Label hidden = {true} htmlFor="retypePassword">Re-type Password</Form.Label>
      <div className="parent2">
      <Form.Control
          id="retypePassword"
          name="retypePassword"
          type={passwordShown ? "text" : "password"}
          placeholder="Re-enter your password"
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.retypePassword && formik.touched.retypePassword && "error"}
      />
       <i className="child2" onClick={togglePasswordVisibility}>{eye}</i>
       </div>
      {formik.errors.retypePassword && formik.touched.retypePassword && (
      <div style={{color: "red"}} className="input-feedback">{formik.errors.retypePassword}</div>
      )}
      <p/>
      
      <Button className="registerButton" type="submit" disabled={formik.isSubmitting}>
          Register
      </Button>
      <p style={{'marginLeft': '140px', 'fontWeight': 'bold'}}> OR </p>
      <Google/>
      <p/>
      <Facebook/>
    </Form>
    </div>
    );
};

export default PopUpSignUp;