var Room = require("./room");

class RoomOrchestrator {
  constructor(hostname) {
    this.rooms = {};
  }

  addCustomer = (customerUsername, roomKey) => {
    this.roomKey.push(customerUsername);
  };

  createRoom = (hostname) => {
    const room = new Room(hostname);
    this.rooms.key = room;
    return room.key;
  };

  deleteRoom = (roomKey) => {
    delete this.rooms.roomKey;
  };

  listInfo = () => {
    return rooms;
  };
}

module.exports = RoomOrchestrator;
