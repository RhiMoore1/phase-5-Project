import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ParkContainer from "./ParkContainer"
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path="/parks">
            <ParkContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
