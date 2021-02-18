import React, { useEffect, useState } from "react";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./style/room.css";
import QRCode from "react-weblineindia-qrcode-generator";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 550,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Userroom(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
        <QRCode value={`#roomKey=${props.roomKey}`} size={550} />
      </p>
    </div>
  );

  return (
    <section>
      <div class="main">
        <UserDetails host={true} display_name={props.display_name}></UserDetails>
        <br></br>
        <TrackTable roomIp={props.roomIp}></TrackTable>
        <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
      </div>
      <div class="qr">
		  Let a user join the room! Scan below.<br></br><br></br>
		  <button class="buttoncss" onClick={handleOpen}
		     >Show QR Code</button>      
		     <Modal 
		         open={open}
             onClose={handleClose}
             aria-labelledby="simple-modal-title"
             aria-describedby="simple-modal-description"
		     >{body}</Modal>
	    </div>
    </section>
  );
}
