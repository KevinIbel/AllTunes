import React, { useState, useEffect } from "react";
import { addCustomer, getRooms } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./style/userLoading.css";

export default function UserLoading(props) {
  const [isAddedToRoom, setAddedToRoom] = useState(false);
  const [roomKey, setRoomKey] = useState();
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const getRoomKeys = async () => {
      const rooms = await getRooms();
      console.log(rooms);
      setRooms(rooms);
    };
    getRoomKeys();
  }, rooms);

  async function addCustomerToRoom() {
    try {
      if (rooms[roomKey]) {
        await addCustomer(
          { token: props.access_token, username: "james" },
          rooms[roomKey]
        );
        setAddedToRoom(true);
      }
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
