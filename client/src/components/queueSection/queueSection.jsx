import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import QueueList from '../queueSection/components/queueList';


const header = {
    padding: "10px 20px",
    textAlign: "center",
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'fixed',
    top: '-35px',
    left: '0px',
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
    left: '0px',
    width: '210px',
    position: 'fixed',
    color: 'rgb(30 215 96)',
    textAlign: 'center',
    background: 'rgb(40, 40, 40)'
 };



export default function InsetList() {
  return (
    <div>   
        <h3 style={header}> Next Song</h3>
    
    <List style ={style} component="nav"  aria-label="contacts">
    <QueueList />

    </List>
    </div>
  );
}
