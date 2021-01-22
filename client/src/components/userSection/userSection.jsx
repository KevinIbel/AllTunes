import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setToken } from "../../dataHandler/store/actions/spotify";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import UserDetails from "../userDetails/userDetails";
import { Container } from "@material-ui/core";

const header = {
  
  
    color: 'rgb(30 215 96)'
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
const style = {
    height: '100%',
    top: '0px',
    right:'0vw',
    position: 'fixed',
    overflowWrap: 'break-word',
    display: 'inline-block',
    color: 'rgb(30 215 96)',
    padding: '15px',
    textAlign: 'center',
    background: 'rgb(40, 40, 40)',
 };

 const thin ={
padding: '0',
fontSize: 'fontSizeSmall',
flexShrink: '0',
display: 'inline-block'
 };
export default function InsetList(props) {
  const host = props.host;
  const ws = new WebSocket('ws://localhost:8888');
  const classes = useStyles();

  const [userList, setUserList] = useState([]);


  useEffect(() => {
    // Only update the list when the message contains a user list.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type == "userlist" ) {
          // Make and set the List of users to display.
          console.log("message.data:"+contents.data);
          console.log("message.data keys:"+Object.keys(contents.data));
          console.log("message.data values:"+Object.values(contents.data));
          setUserList(makeUserList(Object.keys(contents.data), Object.values(contents.data)));
        }
      } catch (e) {
        // If the message isn't a user list, the list isn't updated.
        console.log(e);
      }
    };
  }, []);

   function makeUserList(userIds, userDisplayNames) {
    // The userlistObj has keys of ids, and values of display names.
    return (
    <Container>
      <List component="nav" style={style}  aria-label="contacts">
        <h3 style={header}> Room Lobby</h3>
        { userIds.map(uid => {
          return (
          <ListItem>
            {userIds[0] == uid ? (
              <div>
              <a button='true' target="_blank"href={"https://open.spotify.com/user/" + uid}>
            
              <ListItemText  primary={userDisplayNames[userIds.indexOf(uid)]}> </ListItemText>   
            </a> 
            <StarIcon></StarIcon>
            </div>
            ) : (
              <div>
              <a button='true' target="_blank"href={"https://open.spotify.com/user/" + uid}>
              <ListItemText inset primary={userDisplayNames[userIds.indexOf(uid)]}></ListItemText>   
            </a> 
           /</div>
            )
            }
            
          </ListItem>
        )})}
      </List>
    </Container>
    )
  };

 

  
    return (
      <div>
    {userList}
    </div>
  );
}
