import React, { useEffect, useState, useRef } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/hostroom.css";
import QRCode from "react-weblineindia-qrcode-generator";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

export default function Hostroom(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
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

  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  return (
    <section>
      <div class="main">
        {props.access_token ? (
          <WebPlaybackReact access_token={props.access_token}>
            <Footer />
          </WebPlaybackReact>
        ) : null}
        <TrackTable
          roomIp={props.roomIp}
          host={true}
          access_token={props.access_token}
          roomKey={props.roomKey}
        ></TrackTable>
        <LobbyUsers host={true} roomIp={props.roomIp}></LobbyUsers>
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
