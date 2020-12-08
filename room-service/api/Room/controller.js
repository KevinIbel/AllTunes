const crypto = require("crypto");
const Room = require("./Room");

class Controller {
  constructor() {
    this.room;
  }

  /**
   * @param {Object} host The customer to add to the room
   * @param {string} host.username The customers username
   * @param {string} host.token The Authentication token of the user given by Spotify.
   */
  createRoom = (host) => {
    var status;
    var data;
    if (this.room) {
      status = "400";
      data = "room has already been created";
      return { status, data };
    }
    if (host.token && host.hostname) {
      this.room = new Room(host);
      status = "201";
      data = { key: this.room.key };
      return { status, data };
    } else {
      status = "400";
      data = "must have hosts username";
      return { status, data };
    }
  };

  /**
   * @param {Object} customer The customer to add to the room
   * @param {string} customer.username The customers username
   * @param {string} customer.token The Authentication token of the user given by Spotify.
   */
  addCustomer = async (customer) => {
    var status;
    var data;
    if (this.room) {
      status = "202";
      data = await this.room.addCustomer(customer);
      return { status, data };
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
