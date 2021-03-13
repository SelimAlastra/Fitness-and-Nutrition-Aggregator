import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProfessionalDashboard from './ProfessionalDashboard';
import BucketList from './BucketList';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={ProfessionalDashboard} exact/>
             <Route path="/buckets" component={BucketList}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;