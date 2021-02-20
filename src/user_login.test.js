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

    // it('validates the email cannot be invalid', async () => {
    //   const { getByLabelText, getByText } = render(<LoginForm />);
    //   const email = getByLabelText(/Email/i);
      
    //   fireEvent.focus(email);
      
    //   let error;
    //   await waitFor(() => {
    //     error = getByText('No email provided');
    //   });
      
    //   expect(error).toBeNull();



      
    // await waitFor(() => { 
    //   expect(email.value).toBe("mock");
    // });
  });

  // it('displays an error message when a required field is touched', async () => {
  //     const validate = () => ({ test: 'Required' });
  
  //     const { container, getByText, getByLabelText } = render(
  //       <Formik validate={validate}>
  //         <form>
  //           <label htmlFor="test">Test</label>
  //           <Field id="test" name="test"/>,
  //         </form>
  //       </Formik>
  //     );
  
  //     // blur past input
  //     const input = getByLabelText('Test');
  //     fireEvent.blur(input);
  
  //     // Ensure error message shows
  //   await  waitFor(() => { 
  //     expect(getByText('Required')).not.toBeNull();
  //     expect(container.querySelector('feedback-input')).not.toBeNull();
  //   });

  //   });
