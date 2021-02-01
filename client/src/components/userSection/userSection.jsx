import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { setToken } from "../../dataHandler/store/actions/spotify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import UserDetails from "../userDetails/userDetails";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";

const header = {
  color: "rgb(30 215 96)",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const style = {
  height: "100%",
  top: "0px",
  right: "0vw",
  position: "fixed",
  overflowWrap: "break-word",
  display: "inline-block",
  color: "rgb(30 215 96)",
  padding: "15px",
  textAlign: "center",
  background: "rgb(40, 40, 40)",
  textDecoration: "none",
};

const userStyle = {
  textAlign: "center", // <-- the magic
  fontWeight: "bold",
  fontSize: 18,
  marginTop: 0,
  width: 200,
};
const thin = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
};

//Pushing to master.

export default function InsetList(props) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    const ws = new WebSocket(wsUrl);
    // Only update the list when the message contains a user list.
    ws.onmessage = (message) => {
      try {
        console.log(message)
        const contents = JSON.parse(message.data);
        if (contents.type == "userlist") {
          // Make and set the List of users to display.
          console.log("message.data:" + contents.data);
          console.log("message.data keys:" + Object.keys(contents.data));
          console.log("message.data values:" + Object.values(contents.data));
          setUserList(
            makeUserList(
              Object.keys(contents.data),
              Object.values(contents.data)
            )
          );
        }
      } catch (e) {
        // If the message isn't a user list, the list isn't updated.
        console.log(e);
      }
    };
  }, [props.roomIp]);

  function makeUserList(userIds, userDisplayNames) {
    // The userlistObj has keys of ids, and values of display names.
    return (
      <Container>
        <List component="nav" style={style} aria-label="contacts">
          <h3 style={header}> Room Lobby</h3>
          {userIds.map((uid) => {
            return (
              <ListItem>
                {userIds[0] == uid ? (
                  <div>
                    <Box alignItems="center" display="flex">
                      <StarIcon style={thin}></StarIcon>

                      <a
                        style={{
                          thin,
                          textDecoration: "none",
                          color: "rgb(30 215 96)",
                        }}
                        button="true"
                        target="_blank"
                        href={"https://open.spotify.com/user/" + uid}
                      >
                        <ListItemText
                          primary={userDisplayNames[userIds.indexOf(uid)]}
                        >
                          {" "}
                        </ListItemText>
                      </a>
                      <StarIcon style={thin}></StarIcon>
                    </Box>
                  </div>
                ) : (
                  <div style={userStyle}>
                    <a
                      style={userStyle}
                      style={{
                        textDecoration: "none",
                        color: "rgb(30 215 96)",
                      }}
                      button="true"
                      target="_blank"
                      href={"https://open.spotify.com/user/" + uid}
                    >
                      <ListItemText
                        primary={userDisplayNames[userIds.indexOf(uid)]}
                      ></ListItemText>
                    </a>
                  </div>
                )}
              </ListItem>
            );
          })}
        </List>
      </Container>
    );
  }

  return <div>{userList}</div>;
}
