import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Hostroom from "./pages/hostroom";
import Userroom from "./pages/userroom";
import Landing from "./pages/landing";
import Loading from "./pages/loading";
import UserLoading from "./pages/userLoading";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default function App() {
  return (
    <ThemeProvider theme={createMuiTheme({ palette: { type: "dark" } })}>
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
          <Route path="/UserLoading">
            <UserLoading />
          </Route>
          <Route path="/userroom">
            <Userroom />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
