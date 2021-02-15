import './App.css';
import LandingPage from "./LandingPage";
import { Route , Link } from "react-router-dom";

 
function App() {
  return (
    <div className="App">
      <Route exact path ="/" component ={LandingPage} />
    </div>
  );
}

export default App;
