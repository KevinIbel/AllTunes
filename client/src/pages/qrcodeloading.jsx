import React, { useState } from "react";
import { addCustomer } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./style/userLoading.css";
import getRoomKey from "../app.js";

export default function UserLoading(props) {
    roomKey = getRoomKey();

  const [isAddedToRoom, setAddedToRoom] = useState(false);
  const [roomKey, setRoomKey] = useState(roomKey);

  //import room key via userroom
  //parse the room key from qrcodelanding to here
  //set default value of TextField to roomkey

  async function addCustomerToRoom() {
    try {
      await addCustomer({ token: props.access_token, username: "james" });
      setAddedToRoom(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (isAddedToRoom) {
    return (
      <Redirect
        to={`/userroom/#roomKey=${roomKey}&access_token=${props.access_token}`}
      ></Redirect>
    );
  } else {
    return (
      <form noValidate id={"form"}>
        <TextField
            defaultValue = {roomKey}
          onChange={(event) => {
            setRoomKey(event.target.value);
          }}
          id="standard-basic"
          label="Room Key"
          color="primary"
        />
        <Button
          onClick={() => {
            addCustomerToRoom();
          }}
          variant="contained"
          color="primary"
        >
          Join Room
        </Button>
      </form>
    );
  }
}
