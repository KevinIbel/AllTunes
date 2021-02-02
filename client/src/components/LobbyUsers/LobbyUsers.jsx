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
  width: "20%%",
  height: "100%",
  bottom: 0,
  left: "80%",
  background: "rgb(40, 40, 40)",
  zIndex: 2000,
};

export default function LobbyUsers(props) {
  const [userList, setUserList] = useState([]);
  const host = props.host;

  useEffect(() => {
    if (!props.ws) return;

    props.ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type == "userlist") {
          console.log(contents);
          setUserList(contents.data);
        }
      } catch (e) {
        // If the message doesn't have tracks, the rows aren't updated.
        console.log(e);
      }
    };
    // Only update the list when the message contains a user list.
  });

  return (
    <Container style={style}>
      <List component="nav" aria-label="contacts">
        <h2 className={"title"}>Room Lobby</h2>
        {userList.map((user) => {
          return (
            <ListItem>
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
                    href={"https://open.spotify.com/user/" + host}
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
                    href={"https://open.spotify.com/user/" + user.userId}
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
