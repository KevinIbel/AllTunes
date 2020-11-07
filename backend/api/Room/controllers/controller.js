const RoomOrchestrator = require("../controllers/roomOrchestrator");

const roomOrchestrator = new RoomOrchestrator();

class Controller {
  constructor() {
    this.roomOrchestrator = new RoomOrchestrator();
  }

  createRoom = (hostname) => {
    var status;
    var data;
    if (hostname) {
      status = "201";
      data = { key: this.roomOrchestrator.createRoom(hostname) };
    } else {
      status = "400";
      data = "must have hosts username";
    }
    return { status, data };
  };

  addCustomer = (customerUsername, roomKey) => {
    var status;
    var data;
    try {
      status = "202";
      data = this.roomOrchestrator.addCustomer(customerUsername, roomKey);
    } catch (error) {
      status = "400";
      data = error;
    }
    return { status, data };
  };

  deleteRoom = (hostname, roomKey) => {
    var status;
    var data;
    try {
      if(this.roomOrchestrator.rooms[roomKey].hostname == hostname){
          status = "204";
          data = this.roomOrchestrator.deleteRoom(roomKey);
      } else {
          throw "only host can delete a room";
      }
    } catch (error) {
      status = "400";
      data = error;
    }
    return { status, data };
  };

  listInfo = () => {
    var data = this.roomOrchestrator.listInfo();
    var status = "200";
    return { status, data };
  };
}

module.exports = Controller;
