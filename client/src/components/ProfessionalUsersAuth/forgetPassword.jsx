import React from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forgotPassword.css';

const ForgetPassword = () => {
    
    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Email must be valid.")
            .required("No email or username provided."),
    });
    
      const formik = useFormik({
      initialValues:{ email: "" },
      validationSchema: schema,
      onSubmit: (values, actions) => {
        if(values.email){
          console.log("Sending email to", values);
          const newData = {
            email: values.email,
          }
          axios.put(`http://localhost:5000/professionalUsers/forgotpassword`, newData)
              .then(() => {
                actions.setFieldValue('general', `Email has been sent to ${values.email}. Please follow the instructions to reset your password.`)
              })
              .catch(err => {
                    actions.setFieldError('email', 'User with that email does not exist. Please register.')
                    console.log(err.response);   
                    actions.setSubmitting(false);
              })
          actions.setSubmitting(true);
        }
      },
    });

  return (
    <div className="FormForgotPassword">
    <Form className="FormForgot" onSubmit={formik.handleSubmit} autoComplete="Off">
        <Form.Label hidden = {true} htmlFor="email">Email</Form.Label>
            <Form.Control className="formControlForgetPassword"
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
          <React.Fragment>
        <Button className="forgetButton" type="submit" name="forgetBtn" disabled={formik.isSubmitting} >
            Submit
        </Button>
        <Form.Text style={{color: "blue"}} variant="outline-success" className="input-feedback">{formik.values.general}</Form.Text>
        </React.Fragment>
    </Form>
    </div>
  );
};

export default ForgetPassword;