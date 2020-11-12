const crypto = require("crypto");
const Room = require("../../Room/room");
//var musicManager = require('../../../music_manager');

class Controller {
  constructor(room) {
    this.room;
  }

  createRoom = (hostname) => {
    var status;
    var data;
    if (hostname) {
      this.room = new Room(hostname);
      status = "201";
      data = { key: this.room.key };
    } else {
      status = "400";
      data = "must have hosts username";
    }
  };

  addCustomer = (customerUsername) => {
    var status;
    var data;
    if (this.room) {
      try {
        status = "202";
        data = this.room.addCustomer(customerUsername);
      } catch (error) {
        status = "400";
        data = error;
      }
    } else {
      status = "400"
      data = "Room has not been created, use POST /room to create a room"
    }
    return { status, data };
  };

  listInfo = () => {
    var data;
    var status;
    if(this.room){
      data = this.room.listInfo();
      status = "200";
    } else {
      status = "400";
      data = "Room has not been created, use POST /room to create a room";
    }
    return { status, data };
  };
}

module.exports = Controller;
