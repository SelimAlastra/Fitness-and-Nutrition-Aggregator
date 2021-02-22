import { React } from "react";
import { shallow, configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AdminLogin from "./AdminLogin";

configure({ adapter: new Adapter() });
describe("AdminLogin", () => {
    it("should render admin login page", () => {
        const wrapper = shallow(<AdminLogin />);
    });
});