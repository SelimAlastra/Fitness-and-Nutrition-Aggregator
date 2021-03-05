import { Switch, Route } from "react-router-dom";
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';

const App = () => {

  return (
    <Switch>
      <Route exact path="/professional/profile/:id" component={ProfessionalProfile}></Route>
    </Switch>
  );
}

export default App;


// test id=604130a84b864a0b7a757945

