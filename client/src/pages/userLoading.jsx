import React, { Component } from "react";
import { addCustomer } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import "./userLoading.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class UserLoading extends Component {
  constructor() {
    super();
    this.state = {
      isAddedToRoom: false,
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async addCustomerToRoom() {
    const params = this.getHashParams();
    const token = params.access_token;
    this.setState({ ...this.state, access_token: token });
    const customer = {
      token: token,
      username: "james",
    };
    try {
      await addCustomer(customer);
      this.setState({ ...this.state, isAddedToRoom: true });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.isAddedToRoom) {
      return (
        <Redirect
          to={`/userroom/#roomKey=${this.state.roomKey}&access_token=${this.state.access_token}`}
        ></Redirect>
      );
    } else {
      return (
        <form noValidate>
          <TextField
            onChange={(event) => {
              this.setState({ ...this.state, roomKey: event.target.value });
            }}
            id="standard-basic"
            label="Room Key"
            color="primary"
          />
          <Button
            onClick={() => {
              this.addCustomerToRoom();
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
}
