var Room = require("./room");

class RoomOrchestrator {
  constructor() {
    this.rooms = {};
  }

  addCustomer = (customerUsername, roomKey) => {
    if (this.rooms[roomKey]) {
      if (!this.rooms[roomKey].customers.includes(customerUsername)) {
        this.rooms[roomKey].addCustomer(customerUsername);
      } else {
        throw "customer already in room";
      }
    } else {
      throw "room does not exist";
    }
  };

  createRoom = (hostname) => {
    while (true) {
      const room = new Room(hostname);
      if (!this.rooms[room.key]) {
        this.rooms[room.key] = room;
        return room.key;
      }
    }
  };

  deleteRoom = (roomKey) => {
    if (this.rooms[roomKey]) {
      delete this.rooms[roomKey];
    } else {
      throw "room does not exist";
    }
  };

  listInfo = () => {
    return this.rooms;
  };
}

module.exports = RoomOrchestrator;
