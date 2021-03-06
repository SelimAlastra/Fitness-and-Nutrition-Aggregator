import { Component, React } from "react";
import { shallow, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AdminLogin from "./AdminLogin";
import { Container } from "react-bootstrap";

configure({ adapter: new Adapter() });
describe("AdminLogin", () => {
    it("should render admin login page", () => {
        const component = shallow(<AdminLogin />)
    });
});