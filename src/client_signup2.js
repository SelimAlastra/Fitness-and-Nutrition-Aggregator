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
const eye = <FontAwesomeIcon icon={faEye} />;

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be a valid email.")
        .required("Required"),
    username: Yup.string()
        .min(3, "Username is too short - should be 3 chars minimum.")
        .max(30, "Username is too long - should be 30 chars maximum.")
        .matches('\s', "Username should not contain space.")
        .required("No username provided."),
    password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
        .matches('\s', "Password should not contain space."),
    retypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match.")
});

const SignUp = () => {

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const formik = useFormik({
  initialValues:{ email: "", username: "", password: "", retypePassword: "" },
  validationSchema: schema,
  onSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Signing Up", values);
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

    <Form.Label htmlFor="username">Username</Form.Label>
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

    <Form.Label htmlFor="password">Password</Form.Label> 
    <Form.Control
        id="password"
        name="password"
        type={passwordShown ? "text" : "password"}
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.password && formik.touched.password && "error"}
    /> <i style={{position: 'absolute', top:'50%', right:'5%'}} onClick={togglePasswordVisiblity}>{eye}</i>
    {formik.errors.password && formik.touched.password && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.password}</div>
    )}
    <p/>
  
    <Form.Label htmlFor="retypePassword">Re-type Password</Form.Label> 
    <Form.Control
        id="retypePassword"
        name="retypePassword"
        type={passwordShown ? "text" : "password"}
        placeholder="Re-enter your password"
        value={formik.values.retypePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={formik.errors.retypePassword && formik.touched.retypePassword && "error"}
    /> <i style={{position: 'absolute', top:'50%', right:'5%'}} onClick={togglePasswordVisiblity}>{eye}</i>
    {formik.errors.retypePassword && formik.touched.retypePassword && (
    <div style={{color: "red"}} className="input-feedback">{formik.errors.retypePassword}</div>
    )}
    <p/>
  
    <Button type="submit" disabled={formik.isSubmitting}>
        Register
    </Button>
        
</Form>
);
};
  export default SignUp;