import React, { Component, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUpButton(){
    return(
        <Link to="/register_form">
            <Button>
              Register
            </Button>
        </Link>
  );
};

export default SignUpButton;