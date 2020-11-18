const crypto = require("crypto");
const Room = require("../room");

class Controller {
  constructor() {
    this.room;
  }

  createRoom = (hostname) => {
    var status;
    var data;
    if (this.room) {
      status = "400";
      data = "room has already been created";
      return { status, data };
    }
    if (hostname) {
      this.room = new Room(hostname);
      status = "201";
      data = { key: this.room.key };
      return { status, data };
    } else {
      status = "400";
      data = "must have hosts username";
      return { status, data };
    }
  };

  addCustomer = (customerUsername) => {
    var status;
    var data;
    if (this.room) {
      status = "202";
      data = this.room.addCustomer(customerUsername);
      return { status };
    } else {
      status = "400";
      data = "Room has not been created, use POST /room to create a room";
      return { status, data };
    }
  };

  listInfo = () => {
    var data;
    var status;
    if (this.room) {
      status = "200";
      data = this.room.listInfo();
    } else {
      status = "200";
      data = {};
    }
    return { status, data };
  };
}

module.exports = Controller;
