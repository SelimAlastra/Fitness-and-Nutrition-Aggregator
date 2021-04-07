import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from 'react-router-dom';
import './resetPassword.css';
import { baseUrl } from '../../api/index';

const ResetPassword = ({ match }) => {
    const eye = <FontAwesomeIcon icon={faEye} />;
    const history = useHistory();
    const location = useLocation();
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [formData, setFormData] = useState({
        password1: '',
        retypePassword: '',
        token: '',
    });
    const { password1, retypePassword, token } = formData;

    useEffect(() => {
        let token = match.params.token
        if (token) {
            setFormData({ ...formData, token, })
        }

    }, [])

    const schema = Yup.object().shape({
        password1: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
            .matches(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/, "Password should not contain blank space."),
        retypePassword: Yup.string()
            .oneOf([Yup.ref("password1")], "Passwords don't match.")
            .required("Required.")
    });

    const formik = useFormik({
        initialValues: formData,
        validationSchema: schema,
        onSubmit: (values, actions) => {
            console.log("Resetting password", values.password1, token);
            const newData = {
                newPassword: values.password1,
                resetPasswordLink: token,
            }
            if (location.pathname.includes("user")) {
                axios.put(`${baseUrl}/basicUsers/resetpassword`, newData)
                    .then(res => {
                        history.push('/')
                    })
                    .catch(err => {
                        console.log(err.response);
                        if (err.response.data.error)
                            actions.setFieldError('general', err.response.data.error);
                    })
            }
            else if (location.pathname.includes("professional")) {
                axios.put(`${baseUrl}/professionalUsers/resetpassword`, newData)
                    .then(res => {
                        history.push('/')
                    })
                    .catch(err => {
                        console.log(err.response);
                        if (err.response.data.error)
                            actions.setFieldError('general', err.response.data.error);
                    })
            }
            actions.setSubmitting(false);
        },
    })

    return (
        <div className="Form">

            <Form className="formReset" onSubmit={formik.handleSubmit} autoComplete="Off">
                <h2 style={{"marginBottom":"30px"}}>Please enter your new password.</h2>
                <Form.Label hidden={true} htmlFor="password1">Password</Form.Label>
                <div className="parent1" style={{ "width": "40%", "marginLeft": "30%", "marginRight": "30%" }}>
                    <Form.Control

                        id="password1"
                        name="password1"
                        type={passwordShown ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formik.values.password1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.errors.password1 && formik.touched.password1 && "error"}
                    />
                    <i className="child1" onClick={togglePasswordVisibility}>{eye}</i>
                </div>
                {formik.errors.password1 && formik.touched.password1 && (
                    <div style={{ color: "red" }} className="input-feedback">{formik.errors.password1}</div>
                )}
                <p />

                <Form.Label hidden={true} htmlFor="retypePassword">Re-type Password</Form.Label>
                <div className="parent2" style={{ "width": "40%", "marginLeft": "30%", "marginRight": "30%", }}>
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
                    <div style={{ color: "red" }} className="input-feedback">{formik.errors.retypePassword}</div>
                )}
                <p />
                <React.Fragment>
                    <Button className="resetButton" type="submit" disabled={formik.isSubmitting}>
                        Submit
        </Button>
                    <Form.Text style={{ color: "red" }} className="input-feedback">{formik.errors.general}</Form.Text>
                </React.Fragment>
            </Form>
        </div>
    );
};

export default ResetPassword;