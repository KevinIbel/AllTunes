import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hostroom from "./pages/hostroom";
import Userroom from "./pages/userroom";
import Landing from "./pages/landing";
import Loading from "./pages/loading";
import UserLoading from "./pages/userLoading";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default function App() {
  const [access_token, setAccess_token] = useState();
  const [roomKey, setRoomKey] = useState();
  const [roomIp, setRoomIp] = useState();

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  useEffect(() => {
    const hashParams = getHashParams();
    setRoomKey(hashParams.roomKey);
    setAccess_token(hashParams.access_token);
  }, [roomKey, access_token]);

  return (
    <ThemeProvider
      theme={createMuiTheme({
        palette: {
          type: "dark",
          primary: { main: "#121212" },
          secondary: { main: "#1DB954", contrastText: "#FFFFFF" },
        },
      })}
    >
      <Router>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/hostroom">
            <Hostroom access_token={access_token} roomKey={roomKey} roomIp={roomIp}/>
          </Route>
          <Route path="/loading">
            <Loading access_token={access_token} roomKey={roomKey} roomIp={roomIp} setRoomIp={setRoomIp}/>
          </Route>
          <Route path="/UserLoading">
            <UserLoading access_token={access_token} roomKey={roomKey} roomIp={roomIp}/>
          </Route>
          <Route path="/userroom">
            <Userroom access_token={access_token} roomKey={roomKey} roomIp={roomIp}/>
          </Route>
          <Route path="/">
            <Landing access_token={access_token} roomKey={roomKey} roomIp={roomIp}/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
