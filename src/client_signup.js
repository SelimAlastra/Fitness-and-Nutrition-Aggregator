import React, { Component, useState} from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import "./client_signup.css";

const eye = <FontAwesomeIcon icon={faEye} />;

function PopUpSignUp(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="registerButton" onClick={handleShow}>
      Register
    </Button>

    <Modal show={show} onHide={handleClose}>
      
      <Modal.Header closeButton>
        <Modal.Title >REGISTRATION FORM</Modal.Title>
      </Modal.Header>
      <Modal.Body> <SignUp/> </Modal.Body>
      
    </Modal>
  </>
  );

};



const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be a valid email.")
        .required("No email provided."),
    username: Yup.string()
        .min(3, "Username is too short - should be 3 chars minimum.")
        .max(30, "Username is too long - should be 30 chars maximum.")
        .matches(/^[a-zA-Z0-9]*$/, "Username should not contain space or special characters.")
        .required("No username provided."),
    phoneNumber: Yup.string()
        .required("No phone number provided.")
        .matches(/^\+(?:[0-9]●?){6,14}[0-9]$/, "Phone number must be valid."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Password should not contain space."),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match.")
        .required("Required.")
});


const SignUp = () => {

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const formik = useFormik({
  initialValues:{ email: "", username: "", password: "", retypePassword: "", phoneNumber: "" },
  validationSchema: schema,
  onSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Signing Up", values);
      setSubmitting(false);
    }, 500);
  },
});

return (
<Form autoComplete="off" onSubmit={formik.handleSubmit}>

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


 
    <Form.Control
        id="phoneNumber"
        name="phoneNumber"
        type="text"
        placeholder="Insert your phone number"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.phoneNumber && formik.touched.phoneNumber && "error"}
    />
    {formik.errors.phoneNumber && formik.touched.phoneNumber && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.phoneNumber}</div>
    )}
    <p/>    
    


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
    <i className="child1" onClick={togglePasswordVisiblity}>{eye}</i>
    </div>
    {formik.errors.password && formik.touched.password && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
    )}
    <p/>
  
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
     <i className="child2" onClick={togglePasswordVisiblity}>{eye}</i>
     </div>
    {formik.errors.retypePassword && formik.touched.retypePassword && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.retypePassword}</div>
    )}
    <p/>
  
    <Button className="registerButton" type="submit" disabled={formik.isSubmitting}>
        Register
    </Button>
</Form>
);
};

export default PopUpSignUp;