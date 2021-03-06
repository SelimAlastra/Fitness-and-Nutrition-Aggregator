import { Switch, Route } from "react-router-dom";
import EditProfessionalDetails from "./components/ProfessionalProfile/EditDetails/EditProfessionalDetails";
import EditServices from "./components/ProfessionalProfile/EditServices/EditServices";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';


const App = (props) => {

  return (
    <Switch>
      <Route exact path="/professional/profile/:id" component={ProfessionalProfile}></Route>
      <Route exact path="/professional/profile/edit/:id" component={EditProfessionalDetails}></Route>
      <Route exact path="/professional/services/edit/:id" component={EditServices}></Route>
    </Switch>
  );
}

export default App;


// test id=604130a84b864a0b7a757945

