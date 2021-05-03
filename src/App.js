import React from 'react';
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        Welcome to Home Page
      </Route>
    
    <Route exact path="/starred">
      Your starred items here
    </Route>

    <Route> 404: page not found
    </Route>
  </Switch>
  );
}

export default App;
