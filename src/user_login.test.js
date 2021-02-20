import * as React from 'react';
import {shallow, configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm, {PopUpLogin} from './user_login.js';
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
  ReactDOM.render(<LoginForm />, div);
});

it('renders react-modal', () => {
    const wrapper = shallow(<LoginForm/>);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

it('opens modal when button is clicked', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find(Modal).prop('show')).toBe(false);

    wrapper.find('Button').simulate('click');
  expect(wrapper.find(Modal).prop('show')).toBe(true);
});

  it('renders content when modal is open', () => {
    const wrapper = mount(<LoginForm></LoginForm>);
    wrapper.find('Button').simulate('click');
    expect(wrapper.find(Modal).text()).toContain("LOGIN FORM");
   
  });
  
  it('has an email input field', () => {
      const wrapper = mount(<LoginForm/>);
      wrapper.find('Button').simulate('click');
      expect(wrapper.containsMatchingElement(<Form.Control type="text" />)).toBe(true);
    });
  
    it('has password input field', () => {
      const wrapper = mount(<LoginForm/>);
      wrapper.find('Button').simulate('click');
      expect(wrapper.containsMatchingElement(<Form.Control type="password" />)).toBe(true);
    });

    test('should update email field on change', async () => {
      const {queryByLabelText} = render(<LoginForm/>)
      const login = queryByLabelText('Email');
      await waitFor(() => { 
      fireEvent.change(login, {
                target: {
                  value: "mock@email.com"
                }
              })
      });
      expect(login.value).toBe("mock@email.com");
    });

    test('should update password field on change', async () => {
      const {queryByLabelText} = render(<LoginForm/>)
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

    it('form submits values and fires', async () => {
      const handleSubmit = jest.fn();
      const { getByText, getByTestId, container} = render(
        <Formik initialValues={{ email: "" , password: ""}} onSubmit={handleSubmit}>
          <FormikForm>
            <Field name="email" data-testid="Email"/>
            <Field name="password" data-testid="Password"/>
            <button type="submit">Submit</button>
          </FormikForm>
        </Formik>
      );

      const email = await waitFor(() => getByTestId('Email'));
      const password = await waitFor(() => getByTestId('Password'));
      const button = await waitFor(() => getByText('Submit'));
  
      fireEvent.change(email, {
        target: {
          value: 'mock@gmail.com',
        },
      });

      fireEvent.change(password, {
        target: {
          value: '1234password',
        },
      });
  
      fireEvent.click(button);

   await waitFor(() => { 
      fireEvent.submit(container.querySelector('form'));
    });

   await  waitFor(() => {
        expect(handleSubmit).toBeCalled();
        expect(handleSubmit.mock.calls[0][0].email).toBe('mock@gmail.com');
        expect(handleSubmit.mock.calls[0][0].password).toBe('1234password');
      });
      
    });

    it('validates the email cannot be blank', async () => {
      const {getByText, getByRole } = render(<LoginForm />);
      const button = getByRole("button", {name: /Log In/i})

      fireEvent.click(button);
      
      let error;
      await waitFor(() => {
        error = getByText('No email provided.');
      });
      
      expect(error).not.toBeNull();
      });


      it('validates the password cannot be blank', async () => {
        const {getByText, getByRole } = render(<LoginForm />);
        const button = getByRole("button", {name: /Log In/i})
  
        fireEvent.click(button);
        
        let error;
        await waitFor(() => {
          error = getByText('No password provided.');
        });
        
        expect(error).not.toBeNull();
        });

      it('validates the email should be valid', async () => {
          const { getByLabelText, getByText} = render(<LoginForm />);
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
        const { getByLabelText, getByText} = render(<LoginForm />);
        const password = getByLabelText(/password/i)
  
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
      const { getByLabelText, getByText} = render(<LoginForm />);
      const password = getByLabelText(/password/i)

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
    const { getByLabelText, getByText} = render(<LoginForm />);
    const password = getByLabelText(/password/i)

    fireEvent.change(password, {
      target: {
        value: 'mock password123',
      },
    });
    
    fireEvent.blur(password);
    
    let error;
    await waitFor(() => {
      error = getByText('Password should not contain space.');
    });
    
    expect(error).not.toBeNull();
});

});
