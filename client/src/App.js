import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProfessionalProfile from './components/ProfessionalProfile/ProfessionalProfile';
import { getProfessional } from './actions/professionals';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div>
//           <Route path="/myprofile" component={ProfessionalProfile} exact></Route>
//         </div>
//       </Router>
//     );
//   }
// }

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfessional("604130a84b864a0b7a757945"));
  }, [dispatch]);

  const profile = useSelector((state) => state.professional); //// error here
  console.log(profile);
  return (
    <ProfessionalProfile profile={profile} isProfessional={true}/>
  );
}

export default App;

