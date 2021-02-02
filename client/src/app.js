import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hostroom from "./pages/hostroom";
import Userroom from "./pages/userroom";
import Landing from "./pages/landing";
import Loading from "./pages/loading";
import UserLoading from "./pages/userLoading";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
//Pushing to master.

export default function App() {
  const [access_token, setAccess_token] = useState();
  const [roomKey, setRoomKey] = useState();
  const [roomIp, setRoomIp] = useState();
  const [display_name, setDisplayName] = useState();
  const [userId, setUserId] = useState();

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

  useEffect(() => {
    if (access_token) {
      async function getUserData() {
        var config = {
          method: "get",
          url: "https://api.spotify.com/v1/me",
          headers: {
            Authorization: "Bearer " + access_token,
          },
        };
        var data = await axios(config)
          .then(function (response) {
            return [response.data.display_name, response.data.id];
          })
          .catch(function (error) {
            throw error;
          });
        setDisplayName(data[0]);
        setUserId(data[1]);
      }
      getUserData();
    }
  }, [access_token]);

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
        <Switch>
          <Route path="/hostroom">
            <Hostroom
              access_token={access_token}
              roomKey={roomKey}
              display_name={display_name}
              roomIp={roomIp}
              setRoomIp={setRoomIp}
              userId={userId}
            />
          </Route>
          <Route path="/loading">
            <Loading
              access_token={access_token}
              roomKey={roomKey}
              display_name={display_name}
              roomIp={roomIp}
              setRoomIp={setRoomIp}
              userId={userId}
            />
          </Route>
          <Route path="/UserLoading">
            <UserLoading
              access_token={access_token}
              roomKey={roomKey}
              display_name={display_name}
              roomIp={roomIp}
              setRoomIp={setRoomIp}
              userId={userId}
            />
          </Route>
          <Route path="/userroom">
            <Userroom
              access_token={access_token}
              roomKey={roomKey}
              display_name={display_name}
              roomIp={roomIp}
              setRoomIp={setRoomIp}
              userId={userId}
            />
          </Route>
          <Route path="/">
            <Landing
              access_token={access_token}
              roomKey={roomKey}
              roomIp={roomIp}
            />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
