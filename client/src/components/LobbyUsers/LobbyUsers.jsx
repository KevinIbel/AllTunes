import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import PersonIcon from "@material-ui/icons/Person";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import "./LobbyUsers.css";

const style = {
  position: "fixed",
  width:'auto',
  height: "100%",
  bottom: "0",
  right: "0",
  background: "rgb(40, 40, 40)",
  color: "rgb(30 215 96)",
  textAlign: 'center',
  overflow:'auto',
};

export default function LobbyUsers(props) {
  const [userList, setUserList] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV === "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    setWs(new WebSocket(wsUrl));
  }, [props.roomIp]);

  useEffect(() => {
    if (!ws) return;
    // Only update the rows when the message contains tracks.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type === "lobby") {
          setUserList(contents.data);
        }
      } catch (e) {
        // If the message doesn't have tracks, the rows aren't updated.
        console.log(e);
      }
    };
  }, [props.roomIp, ws]);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => {
      ws.send("LobbyRequest");
    };
  }, [ws]);

  return (
    <Container style={style}>
      <List style={{width:'350px',minWidth:'350px'}} component="nav" aria-label="contacts">
        <h2 className={"title"}>Room Lobby</h2>
        {userList.map((user,index) => {
          return (
            <ListItem key={index}>
              {user.host === true ? (
                <Box alignItems="center" display="flex">
                  <VolumeUpIcon color="secondary"></VolumeUpIcon>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "rgb(30 215 96)",
                    }}
                    button="true"
                    target="_blank"
                    rel="noreferrer"
                    href={"https://open.spotify.com/user/" + user.displayName}
                  >
                  <ListItemText primary={user.displayName}> </ListItemText>
                  </a>
                </Box>
              ) : (
                <Box alignItems="center" display="flex">
                  <PersonIcon color="secondary"></PersonIcon>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "rgb(30 215 96)",
                    }}
                    button="true"
                    target="_blank"
                    rel="noreferrer"
                    href={"https://open.spotify.com/user/" + user.displayName}
                  >
                    <ListItemText primary={user.displayName}></ListItemText>
                  </a>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
