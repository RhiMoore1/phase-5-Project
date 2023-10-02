import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ParkContainer from "./ParkContainer"

function App() {
  return (
    <div>
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
