import React, { Component, useState, useEffect} from 'react';
import { ErrorMessage, useFormik } from "formik";
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


// const isCorrectLogin = (login) => {
//   if(!login) return "no input";
//   if(login !=='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
//     return "This is not an email"
//   else
//     return "This is an email."

// };

function PopUpLogin(){
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return(
    <>
    <Button className="loginButton" variant="primary" onClick={handleShow}>
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

// Yup.addMethod(Yup.string(), 'checkEmailOrUsername', function(message = "login"){
//     return this.test("checkEmailOrUsername", message, function (val) {
//       return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
//     })
// });
const Login = () => {

function UserArray(){
    const [users, setUsers] = useState([])
    
    useEffect(() => {
      async function fetchData() { 
        const result = await fetch("http://localhost:3001");
        result
        .json()
        .then(result => setUsers(result)) 
      };
  
      fetchData();
    }, []);
  
    return (
        [].concat.apply([], users.map(u => ([u.username, u.email])))
    )
}

function PassArray(){
  const [users, setUsers] = useState([])
  const emailInput = document.getElementById("input");
  
  useEffect(() => {
    async function fetchData() { 
      const result = await fetch("http://localhost:3001");
      result
      .json()
      .then(result => setUsers(result)) 
    };

    fetchData();
  }, []);

  return (
    users.map(u => u.password)
  )
}

let userArray = UserArray()
let passArray =PassArray()

const schema = Yup.object().shape({
    email: Yup.string()
        .oneOf(userArray, "Incorrect username or email.")
        .required("No email or username provided."),
    
    password: Yup.string()
        .oneOf(passArray, "Incorrect password")
        .required("No password provided.")
});

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
<div className="Form">
<Form onSubmit={formik.handleSubmit} autoComplete="Off">
  <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
    <Form.Control id="loginInput"
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
    <a href = "">Forgot Password?</a>
    <p/>
    <Button className="loginButton" type="submit" name="loginBtn" disabled={formik.isSubmitting}>
        Log In
    </Button>
    <p/>
  
</Form>
</div>
);
};
  export default PopUpLogin;



