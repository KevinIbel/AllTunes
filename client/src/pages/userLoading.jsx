import React, { useState, useEffect } from "react";
import { addCustomer, getRooms } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./style/userLoading.css";
//Pushing to master.

export default function UserLoading(props) {
  const [isAddedToRoom, setAddedToRoom] = useState(false);
  const [roomKey, setRoomKey] = useState();
  const [rooms, setRooms] = useState();

  useEffect(() => {
    getRoomKeys();
  }, rooms);

  async function getRoomKeys() {
    if ((process.env.NODE_ENV == "development")) {
      const rooms = {};
      rooms[roomKey] = "http://localhost:8888";
      setRooms({ roomKey: "http://localhost:8888" });
    } else {
      setRooms(await getRooms());
    }
  }

  async function addCustomerToRoom() {
    console.log(rooms[roomKey] || (process.env.NODE_ENV == "development"))
    try {
      if (rooms[roomKey] || (process.env.NODE_ENV == "development")) {
        await addCustomer(
          {
            token: props.access_token,
            username: props.display_name,
            userid: props.id,
          },
          rooms[roomKey]
        );
        setAddedToRoom(true);
        props.setRoomIp(rooms[roomKey]);
      } else {
        getRoomKeys();
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
