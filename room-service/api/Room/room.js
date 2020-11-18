const crypto = require('crypto');

class Room {
  constructor(hostname) {
    this.hostname = hostname;
    this.customers = [];
    this.key = crypto
      .randomBytes(20)
      .toString("hex")
      .substring(0, 10)
      .toUpperCase();
  }

  addCustomer = (customerUsername) => {
    this.customers.push(customerUsername);
  };

  getMusic = () => {
    return this.musicManager.getMusic();
  };

  listInfo = () => {
    return {
      host: this.hostname,
      customers: this.customers,
      key: this.key,
    }
  }
}

module.exports = Room;
