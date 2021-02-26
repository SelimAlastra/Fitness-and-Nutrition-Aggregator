import * as React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RegisterForm from './client_signup.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ReactDOM, { findDOMNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Formik, Form as FormikForm, Field} from 'formik';

configure({ adapter: new Adapter() });

describe("Should render the form", () => {
    afterEach(cleanup)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterForm />, div);
});

it('renders react-modal', () => {
    const wrapper = shallow(<RegisterForm/>);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

it('opens modal when button is clicked', () => {
    const wrapper = shallow(<RegisterForm />);
    expect(wrapper.find(Modal).prop('show')).toBe(false);

    wrapper.find('Button').simulate('click');
  expect(wrapper.find(Modal).prop('show')).toBe(true);
});

  it('renders content when modal is open', () => {
    const wrapper = mount(<RegisterForm/>);
    wrapper.find('Button').simulate('click');
    expect(wrapper.find(Modal).text()).toContain("REGISTRATION FORM");
   
  });
  
  it('has an email input field', () => {
      const wrapper = mount(<RegisterForm/>);
      wrapper.find('Button').simulate('click');
      expect(wrapper.containsMatchingElement(<Form.Control name="email" />)).toBe(true);
    });

    it('has a username input field', () => {
        const wrapper = mount(<RegisterForm/>);
        wrapper.find('Button').simulate('click');
        expect(wrapper.containsMatchingElement(<Form.Control name="username" />)).toBe(true);
      });

    it('has phone number input field', () => {
        const wrapper = mount(<RegisterForm/>);
        wrapper.find('Button').simulate('click');
        expect(wrapper.containsMatchingElement(<Form.Control name="phoneNumber" />)).toBe(true);
    });
  
    it('has password input field', () => {
      const wrapper = mount(<RegisterForm/>);
      wrapper.find('Button').simulate('click');
      expect(wrapper.containsMatchingElement(<Form.Control name="password" />)).toBe(true);
    });

    it('has re-type password input field', () => {
        const wrapper = mount(<RegisterForm/>);
        wrapper.find('Button').simulate('click');
        expect(wrapper.containsMatchingElement(<Form.Control name="retypePassword" />)).toBe(true);
      });

    test('should update email field on change', async () => {
      const {queryByLabelText} = render(<RegisterForm/>)
      const email = queryByLabelText('Email');
      await waitFor(() => { 
      fireEvent.change(email, {
                target: {
                  value: "mock@email.com"
                }
              })
      });
      expect(email.value).toBe("mock@email.com");
    });

    test('should update username field on change', async () => {
        const {queryByLabelText} = render(<RegisterForm/>)
        const username = queryByLabelText('Username');
        await waitFor(() => { 
        fireEvent.change(username, {
                  target: {
                    value: "mockusername"
                  }
                })
        });
        expect(username.value).toBe("mockusername");
      });


    test('should update phoneNumber field on change', async () => {
        const {queryByLabelText} = render(<RegisterForm/>)
        const number = queryByLabelText('Phone Number');
        await waitFor(() => { 
        fireEvent.change(number, {
                  target: {
                    value: "+40751252418"
                  }
                })
        });
        expect(number.value).toBe("+40751252418");
    });


    test('should update password field on change', async () => {
      const {queryByLabelText} = render(<RegisterForm/>)
      const password = queryByLabelText('Password');
      await waitFor(() => { 
      fireEvent.change(password, {
                target: {
                  value: "1234password"
                }
              })
      });
      expect(password.value).toBe("1234password");
    });


    test('should update re-type password field on change', async () => {
        const {queryByLabelText} = render(<RegisterForm/>)
        const password2 = queryByLabelText('Re-type Password');
        await waitFor(() => { 
        fireEvent.change(password2, {
                  target: {
                    value: "1234password2"
                  }
                })
        });
        expect(password2.value).toBe("1234password2");
      });

    it('form submits values and fires', async () => {
      const handleSubmit = jest.fn();
      const { getByText, getByTestId, container} = render(
        <Formik initialValues={{ email: "" , password: "", username: "", number: "", password2: ""}} onSubmit={handleSubmit}>
          <FormikForm>
            <Field name="email" data-testid="Email"/>
            <Field name="username" data-testid="Username"/>
            <Field name="number" data-testid="Number"/>
            <Field name="password" data-testid="Password"/>
            <Field name="password2" data-testid="Password2"/>
            <button type="submit">Submit</button>
          </FormikForm>
        </Formik>
      );

      const email = await waitFor(() => getByTestId('Email'));
      const username = await waitFor(() => getByTestId('Username'));
      const number = await waitFor(() => getByTestId('Number'));    
      const password = await waitFor(() => getByTestId('Password'));
      const password2 = await waitFor(() => getByTestId('Password2'));
      const button = await waitFor(() => getByText('Submit'));
  
      fireEvent.change(email, {
        target: {
          value: 'mock@gmail.com',
        },
      });

      fireEvent.change(username, {
        target: {
          value: 'mockusername',
        },
      });

       fireEvent.change(number, {
            target: {
            value: '+40751252418',
            },
        });

      fireEvent.change(password, {
        target: {
          value: '1234password',
        },
      });

      fireEvent.change(password2, {
        target: {
          value: '1234password2',
        },
      });
  
      fireEvent.click(button);

   await waitFor(() => { 
      fireEvent.submit(container.querySelector('form'));
    });

   await  waitFor(() => {
        expect(handleSubmit).toBeCalled();
        expect(handleSubmit.mock.calls[0][0].email).toBe('mock@gmail.com');
        expect(handleSubmit.mock.calls[0][0].username).toBe('mockusername');
        expect(handleSubmit.mock.calls[0][0].number).toBe('+40751252418');
        expect(handleSubmit.mock.calls[0][0].password).toBe('1234password');
        expect(handleSubmit.mock.calls[0][0].password2).toBe('1234password2');
      });
      
    });
    

  it('validates the email cannot be blank', async () => {
    const {getByText, getByRole } = render(<RegisterForm />);
    const button = getByRole("button", {name: /Register/i})

    fireEvent.click(button);
    
    let error;
    await waitFor(() => {
      error = getByText('No email provided.');
    });
    
    expect(error).not.toBeNull();
    });

    it('validates the password cannot be blank', async () => {
      const {getByText, getByRole } = render(<RegisterForm />);
      const button = getByRole("button", {name: /Register/i})
  
      fireEvent.click(button);
      
      let error;
      await waitFor(() => {
        error = getByText('No password provided.');
      });
      
      expect(error).not.toBeNull();
      });


      it('validates the username cannot be blank', async () => {
        const {getByText, getByRole } = render(<RegisterForm />);
        const button = getByRole("button", {name: /Register/i})
    
        fireEvent.click(button);
        
        let error;
        await waitFor(() => {
          error = getByText('No username provided.');
        });
        
        expect(error).not.toBeNull();
      });

    it('validates the phone number cannot be blank', async () => {
      const {getByText, getByRole } = render(<RegisterForm />);
      const button = getByRole("button", {name: /Register/i})

      fireEvent.click(button);
      
      let error;
      await waitFor(() => {
        error = getByText('No phone number provided.');
      });
      
      expect(error).not.toBeNull();
      });

      it('validates the confirm password cannot be blank', async () => {
        const {getByText, getByRole } = render(<RegisterForm />);
        const button = getByRole("button", {name: /Register/i})
    
        fireEvent.click(button);
        
        let error;
        await waitFor(() => {
          error = getByText('Required.');
        });
        
        expect(error).not.toBeNull();
        });

    it('validates the email should be valid', async () => {
        const { getByLabelText, getByText} = render(<RegisterForm />);
        const email = getByLabelText(/email/i)

        fireEvent.change(email, {
          target: {
            value: 'mock',
          },
        });
        
        fireEvent.blur(email);
        
        let error;
        await waitFor(() => {
          error = getByText('Email must be a valid email.');
        });
        
        expect(error).not.toBeNull();
    });

    it('validates the password is too short', async () => {
      const { queryByLabelText, getByText} = render(<RegisterForm />);
      const password = queryByLabelText("Password")

      fireEvent.change(password, {
        target: {
          value: 'mock',
        },
      });
      
      fireEvent.blur(password);
      
      let error;
      await waitFor(() => {
        error = getByText('Password is too short - should be 8 chars minimum.');
      });
      
      expect(error).not.toBeNull();
  });

  it('validates the password must contain a number', async () => {
    const { queryByLabelText, getByText} = render(<RegisterForm />);
    const password = queryByLabelText("Password")

    fireEvent.change(password, {
      target: {
        value: 'mockpassword',
      },
    });
    
    fireEvent.blur(password);
    
    let error;
    await waitFor(() => {
      error = getByText('Password must contain a number.');
    });
    
    expect(error).not.toBeNull();
  });

  it('validates the password should not contain spaces', async () => {
    const { queryByLabelText, getByText} = render(<RegisterForm />);
    const password = queryByLabelText('Password')

    fireEvent.change(password, {
      target: {
        value: 'mock password123',
      },
    });
    
    fireEvent.blur(password);
    
    let error;
    await waitFor(() => {
      error = getByText('Password should not contain blank space.');
    });
    
    expect(error).not.toBeNull();
  });


  it('validates the username should not contain spaces or special characters', async () => {
    const { getByLabelText, getByText} = render(<RegisterForm />);
    const username = getByLabelText(/username/i)

    fireEvent.change(username, {
      target: {
        value: 'mock username@',
      },
    });
    
    fireEvent.blur(username);
    
    let error;
    await waitFor(() => {
      error = getByText('Username should not contain space or special characters.');
    });
    
    expect(error).not.toBeNull();
  });


  it('validates the username should not be shorter than 8 characters', async () => {
    const { getByLabelText, getByText} = render(<RegisterForm />);
    const username = getByLabelText(/username/i)

    fireEvent.change(username, {
      target: {
        value: 'mo',
      },
    });
    
    fireEvent.blur(username);
    
    let error;
    await waitFor(() => {
      error = getByText('Username is too short - should be 3 chars minimum.');
    });
    
    expect(error).not.toBeNull();
  });

  it('validates the username should not be longer than 30 characters', async () => {
    const { getByLabelText, getByText} = render(<RegisterForm />);
    const username = getByLabelText(/username/i)

    fireEvent.change(username, {
      target: {
        value: 'abcdefghijklmnopqrstuvxyz1234567890',
      },
    });
    
    fireEvent.blur(username);
    
    let error;
    await waitFor(() => {
      error = getByText('Username is too long - should be 30 chars maximum.');
    });
    
    expect(error).not.toBeNull();
  });

  it('validates the phone number should be valid', async () => {
    const { getByLabelText, getByText} = render(<RegisterForm />);
    const phoneNo = getByLabelText(/phone number/i)

    fireEvent.change(phoneNo, {
      target: {
        value: '12345678',
      },
    });
    
    fireEvent.blur(phoneNo);
    
    let error;
    await waitFor(() => {
      error = getByText('Phone number must be valid.');
    });
    
    expect(error).not.toBeNull();
  });


  it('validates the confirm password should be like password', async () => {
    const { getByLabelText, getByText} = render(<RegisterForm />);
    const password = getByLabelText('Password')
    const password2 = getByLabelText(/Re-type Password/i)

    fireEvent.change(password, {
      target: {
        value: 'mockpassword1234',
      },
    });

    fireEvent.change(password2, {
      target: {
        value: 'mockpassword12345',
      },
    });
    
    fireEvent.blur(password2);
    
    let error;
    await waitFor(() => {
      error = getByText("Passwords don't match.");
    });
    
    expect(error).not.toBeNull();
  });

  });