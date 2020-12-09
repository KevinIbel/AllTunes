import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Hostroom from "./pages/hostroom";
import Userroom from "./pages/userroom";
import Landing from "./pages/landing";
import Index from "./pages/index";
import Loading from "./pages/loading";

export default function App() {
    return (
      <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/hostroom">
              <Hostroom />
            </Route>
            <Route path="/loading">
              <Loading />
            </Route>
            <Route path="/landing">
              <Landing />
            </Route>
            <Route path="/userroom">
              <Userroom />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </Switch>
      </Router>
    );
  }

  