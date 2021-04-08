import React, { useState, useEffect } from "react";
import { addCustomer, getRooms } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./style/userLoading.css";

export default function UserLoading(props) {
  const [isAddedToRoom, setAddedToRoom] = useState(false);
  const [rooms, setRooms] = useState();
  const [roomKey, setRoomKey] = useState();

  useEffect(() => {
    if (props.roomKey) {
      joinWithRoomKey();
    }
  }, [props]);

  useEffect(() => {
    getRoomKeys();
  }, rooms);

  useEffect(() => {
  }, [isAddedToRoom]);

  async function joinWithRoomKey() {
    await getRoomKeys();
    await addCustomerToRoom();
  }

  async function getRoomKeys() {
    if (process.env.NODE_ENV === "development") {
      const rooms = {};
      if (props.roomKey) {
        rooms[props.roomKey] = "http://localhost:8888";
      } else {
        rooms["00000000"] = "http://localhost:8888";
      }
      setRooms(rooms);
    } else {
      setRooms(await getRooms());
    }
  }

  async function addCustomerToRoom() {
    try {
      if (props.access_token && (props.roomKey || process.env.NODE_ENV === "development") && props.display_name) {
        await addCustomer(
          {
            token: props.access_token,
            username: props.display_name,
            userId: props.userId,
          },
          rooms[props.roomKey ? props.roomKey : roomKey]
        );
        setAddedToRoom(true);
        props.setRoomIp(rooms[props.roomKey]);
      } else {
        console.error("Missing key User Display name or roomKey or accessToken");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (isAddedToRoom) {
    return (
      <Redirect
        to={`/userroom/#roomKey=${props.roomKey}&access_token=${props.access_token}`}
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
