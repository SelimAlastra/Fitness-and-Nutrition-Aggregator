import User from '../models/basicUser.model.js';
import ProfUser from '../models/professionalUser.model.js';
import expressJwt from 'express-jwt';
import _ from 'lodash';
import pkg from 'google-auth-library';
const { OAuth2Client } = pkg;
import fetch from 'node-fetch';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.MAIL_KEY);

export const registerController = (req, res) => {
  const { username, email, password, name} = req.body;
  
  if (User.findOne({email}))
      {User.findOne({
      email
      }).exec((err, user) => {
        if(user) {
      return res.status(400).json({
        errors: 'Email already in use.'
      });
    } 
        else if(ProfUser.findOne({email}))
        {ProfUser.findOne({
        email
        }).exec((err, user) => {
          if(user) {
        return res.status(400).json({
          errors: 'Email already in use.'
        });
      }
        else {
          const user = new User({
              username,
              email,
              password,
              name
          });
              user.save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err))
            }
        })
      }
    })
  }
   if(User.findOne({username}))
      {User.findOne({
      username
      }).exec((err, user) => {
        if(user) {
      return res.status(400).json({
        errors: 'Username already in use.'
      });
    }else if(User.findOne({username}))
              {ProfUser.findOne({
              username
              }).exec((err, user) => {
                if(user) {
              return res.status(400).json({
                errors: 'Username already in use.'
              });
              }
              else{
              const user = new User({
                  username,
                  email,
                  password, 
                  name
              });
                  user.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err))
              }
            })
          }  
       })
    }
  } 

export const loginController = (req, res) => {
  const { email, password } = req.body;
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }
      // authenticate
      else if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email and password do not match'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      );
      const { _id, username, email, name} = user;

      return res.json({
        token,
        user: {
          _id,
          username,
          email,
          name
        }
      });
    });
};

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT);
// Google Login
export const googleController = (req, res) => {
  const { idToken } = req.body;
  client
    .verifyIdToken({ idToken, audience: process.env.REACT_APP_GOOGLE_CLIENT })
    .then(response => {
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name }
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            let username = name.trim(); //implement random number generator later
            user = new User({ username, email, password, name });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name} = data;
              return res.json({
                token,
                user: { _id, email, name }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    });
};

export const facebookController = (req, res) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name }
            });
          } else {
            let username = name.trim();
            let password = email + process.env.JWT_SECRET;
            user = new User({ username, email, password, name });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name } = data;
              return res.json({
                token,
                user: { _id, email, name }
              });
            });
          }
        });
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try later'
        });
      })
  );
};

export const forgotPasswordController = (req, res) => {
  const { email } = req.body;

    User.findOne(
      {
        email
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'User with that email does not exist'
          });
        }

        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: '10m'
          }
        );

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Password Reset link`,
          html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/user/password/reset/${token}</p>
                    <hr />
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
        };

        return user.updateOne(
          {
            resetPasswordLink: token
          },
          (err, success) => {
            if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'Database connection error on user password forgot request'
              });
            } else {
              sgMail
                .send(emailData)
                .then(sent => {
                  // console.log('SIGNUP EMAIL SENT', sent)
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to reset your password.`
                  });
                })
                .catch(err => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
                  return res.json({
                    message: err.message
                  });
                });
            }
          }
        );
      }
    );
};

export const resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
      jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
        err,
        decoded
      ) {
        if (err) {
          return res.status(400).json({
            error: 'This link has expired. Try again.'
          });
        }

        User.findOne(
          {
            resetPasswordLink
          },
          (err, user) => {
            if (err || !user) {
              console.log(user);
              return res.status(400).json({
                error: 'Something went wrong. Please try again later.'
              });
            }

              user.updateOne({
                password: newPassword,
                resetPasswordLink: ""
              },
              (err, result) => {
              if (err) {
                return res.status(400).json({
                  error: 'An error has occurred while resetting your password.'
                });
              }
              res.json({
                message: `Great! Now you can login with your new password.`
              });
            });
          }
        );
      });
  }
};

