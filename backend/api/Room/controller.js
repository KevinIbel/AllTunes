const {
  getPodsData,
  createPod,
  deletePod,
} = require("../clients/kubernates-client/index");

class RoomController {
  constructor() {
    this.portsToUse = [8888];
    this.UsedPorts = [];
    this.rooms = [];
  }

  async createRoom(hostname) {
    await createPod(this.portsToUse[0]);
    this.UsedPorts[0] = this.portsToUse[0]
  }

  initaliseRoom(){

  }
}

module.exports = RoomController
