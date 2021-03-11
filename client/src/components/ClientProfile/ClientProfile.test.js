import { screen, render, fireEvent, getByTestId } from "@testing-library/react";
import ClientProfile from './ClientProfile';

test("Check ClientProfile with details renders correctly", () => {
    render(<ClientProfile 
    name="Joshua Harris" 
    location="London, UK" 
    description="I am looking for a personal trainer to help acheive my goals!"
    tags={["#yoga", "#pilates", "#HealthyEating"]}
    profileImage="https://images.unsplash.com/photo-1582556362337-6a785ee99c63?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
    instagramLink="https://instagram.com"
    youtubeLink="https://youtube.co.uk"
    goals={["loose 2kg in 2 weeks", "learn how to cook nutritious meals"]}
    />);
    expect(screen.getByTestId("name").textContent).toBe("Joshua Harris");
    expect(screen.getByTestId("location").textContent).toBe("London, UK");
    expect(screen.getByTestId("description").textContent).toBe("I am looking for a personal trainer to help acheive my goals!");
    expect(screen.getByTestId("profileImage")).toBeInTheDocument();
    expect(screen.getByTestId("tags").textContent).toBe("#yoga | #pilates | #HealthyEating");
    expect(screen.getByTestId('socialBar')).toBeInTheDocument();

});

test("ClientProfile without details renders correctly", () => {
    render(<ClientProfile />);
    expect(screen.getByTestId('profileCard')).toBeDefined();
});

test("modal shows the goals and the close button", () => {
    render(<ClientProfile 
    goals={["loose 2kg in 2 weeks", "learn how to cook nutritious meals"]}
    />);
    const button = screen.getByTestId("goalsButton");
    fireEvent.click(button);
    expect(screen.getByTestId("goalsPopup")).toBeDefined();
    expect(screen.getAllByTestId("list-item")).toHaveLength(2);
});

test("modal shows the no goals message and the close button", () => {
    render(<ClientProfile />);
    const button = screen.getByTestId("goalsButton");
    fireEvent.click(button);
    expect(screen.getByTestId("goalsPopup")).toBeDefined();
    expect(screen.getByTestId("noGoalsMessage").textContent).toBe("Sorry, you currently have no goals!");
});

test("modal closes when close button is clicked", () => {
    render(<ClientProfile />);
    const goalsButton = screen.getByTestId("goalsButton");
    fireEvent.click(goalsButton);
    expect(screen.getByTestId("goalsPopup")).toBeDefined();
    const closeButton = screen.getByTestId("closeButton");
    fireEvent.click(closeButton);
    const popup = screen.queryByTestId("goalsPopup");
    expect(popup).toBeNull(); // the popup should not be in the dom
});

test("checks if instagram and youtbe icons are displayed when supplied links", () => {
    render(<ClientProfile 
    instagramLink="https://instagram.com"
    youtubeLink="https://youtube.co.uk"
    />);
    expect(document.querySelectorAll('svg').length).toBe(2);
});









