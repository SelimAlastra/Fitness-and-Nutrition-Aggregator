import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import BucketList from './BucketList';

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Dashboard} exact/>
             <Route path="/buckets" component={BucketList}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;