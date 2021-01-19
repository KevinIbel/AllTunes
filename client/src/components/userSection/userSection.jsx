import React, { useState, useEffect } from 'react';
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
    padding: "10px 20px",
    textAlign: "center",
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    top: '-35px',
    right: '0px',
    bottom: '10px',
    width: '210px',
    position: 'fixed',
    width: '210px',
    fontSize: "22px",
    zIndex: '999',
    color: 'rgb(30 215 96)'
  }

const style = {
    height: '100%',
    top: '0px',
    right: '0px',
    width: '210px',
    position: 'fixed',
    color: 'rgb(30 215 96)',
    textAlign: 'center',
    background: 'rgb(40, 40, 40)'
 };



export default function InsetList(props) {
  const host = props.host;
  const ws = new WebSocket('ws://localhost:8888');

  const [listItems, setListItems] = useState([]);


  useEffect(() => {
    // Only update the list when the message contains a user list.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);

        console.log("TYPE OF MSG:" + (contents.type));

        if (contents.type == "userlist" ) {
          console.log("contentsdata:" + JSON.stringify(contents.data));
          console.log("contentsdatatype:" + (typeof contents.data));
          const setData = new Set(contents.data);
          const uniqueArray = Array.from(setData);
          setListItems(uniqueArray);
          console.log(contents.data);
          console.log(uniqueArray);
          console.log(setData);
        }
      } catch (e) {
        // If the message isn't a user list, the list isn't updated.
        console.log(e);
      }
    };
  }, []);

  return (
    <Container>
    <div>   
        <h3 style={header}> Room Lobby</h3>
    
    <List style ={style} component="nav"  aria-label="contacts">
      {listItems.map((custName,index) => {
        console.log(custName);
        return (
          <ListItemText inset primary={custName}>
 
          </ListItemText>
        );
})}
</List>
    </div>
  </Container>
  );
}
