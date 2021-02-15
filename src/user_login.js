import React, { Component, useState} from 'react';
import { useFormik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import './user-login.css'
const eye = <FontAwesomeIcon icon={faEye} />;


function PopUpLogin(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="loginButton" variant="primary" onClick={handleShow}>
      Login
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>LOGIN FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <Login/> </Modal.Body>
    </Modal>
  </>
  );

};

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be a valid email.")
        .required("No email provided."),
    
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/^\s+$/, "Password should not contain space.")
});

const Login = () => {

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const formik = useFormik({
  initialValues:{ email: "", password: "" },
  validationSchema: schema,
  onSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Logging in", values);
      setSubmitting(false);
    }, 500);
  },
});

return (
<Form onSubmit={formik.handleSubmit}>

    <Form.Label htmlFor="email">Email</Form.Label>
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
    )}
    <p/>

    <Form.Label htmlFor="password">Password</Form.Label> 
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
    <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
    )}
    <a href = "">Forgot Password?</a>
    <p/>
    <Button className="loginButton" type="submit" disabled={formik.isSubmitting}>
        Login
    </Button>
        
    <p/>
  
</Form>
);
};
  export default PopUpLogin;



