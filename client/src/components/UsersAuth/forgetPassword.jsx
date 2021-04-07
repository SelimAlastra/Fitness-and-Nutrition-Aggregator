import React from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './forgotPassword.css';
import { useLocation } from 'react-router-dom';

const ForgetPassword = () => {
    
  const location = useLocation();

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
          if(location.pathname.includes("user")){
          axios.put(`http://localhost:5000/basicUsers/forgotpassword`, newData)
              .then(() => {
                actions.setFieldValue('general', `Email has been sent to ${values.email}. Please follow the instructions to reset your password.`)
              })
              .catch(err => {
                    actions.setFieldError('email', 'User with that email does not exist. Please register.')
                    console.log(err.response);   
                    actions.setSubmitting(false);
              })
          }
          else if(location.pathname.includes("professional"))
          {
          axios.put(`http://localhost:5000/professionalUsers/forgotpassword`, newData)
              .then(() => {
                actions.setFieldValue('general', `Email has been sent to ${values.email}. Please follow the instructions to reset your password.`)
              })
              .catch(err => {
                    actions.setFieldError('email', 'User with that email does not exist. Please register.')
                    console.log(err.response);   
                    actions.setSubmitting(false);
            })
          }
        actions.setSubmitting(true);
        }
      },
    });

  return (
    <div className="FormForgotPassword">
    <Form className="FormForgot" onSubmit={formik.handleSubmit} autoComplete="Off">
       <h2 className = "ForgotPassText"> Please enter your email adress in order to reset your password </h2> 
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
        <Button className="forgetButton" variant="outline-success" type="submit" name="forgetBtn" disabled={formik.isSubmitting} >
            Submit
        </Button>
        <Button className="forgetButton" variant="outline-success" name="forgetBtn" type="submit" href="/">
            Go back to landing page
        </Button>
        <Form.Text style={{color: "blue"}} className="input-feedback">{formik.values.general}</Form.Text>
        </React.Fragment>
    </Form>
    </div>
  );
};

export default ForgetPassword;