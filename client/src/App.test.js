import { React } from "react";
import { shallow, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen } from '@testing-library/react';
import App from './App';

configure({ adapter: new Adapter() });
describe("App", () => {
    it("should render admin login page", () => {
        const wrapper = shallow(<App />);
    });
});
