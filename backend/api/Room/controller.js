const crypto = require("crypto");
const {
  createPod,
  createService,
  deletePod,
  isServiceReady,
  getServiceNodePort,
} = require("../clients/kubernates-client/index");

const { initRoom } = require("../clients/room-client/index");
class RoomController {
  constructor() {
    this.rooms = {};
  }

  /**
   * This function creates a new instance of room-service within the Kubernates cluster.
   * @param {Object} host.username The hosts username
   * @param {String} host.token The customers spotify access token
   */
  async createRoom(host) {
    try {
      const roomKey = crypto
        .randomBytes(20)
        .toString("hex")
        .substring(0, 10)
        .toUpperCase();
      await createPod(roomKey); //create new pod in kubernates cluster
      await createService(roomKey); //create new service for pod
      await isServiceReady(roomKey); //wait until the service is ready
      const serviceIp = await getServiceNodePort(roomKey); //get nodePort of Service
      await initRoom(serviceIp, host); //initialize the room
      this.rooms[roomKey] = serviceIp;
      console.log("new room created", {
        roomKey: roomKey,
        serviceIp: serviceIp,
      });
      return { status: 201, data: { roomKey, roomIp: serviceIp } }; //return room key
    } catch (error) {
      console.error(error);
      return { status: 500, data: error };
    }
  }

  async deleteRoom(roomKey) {
    try {
      const pod = this.rooms[roomKey];
      await deletePod(this.rooms[roomKey].metadata.name);
      delete this.rooms[roomKey];
      return { status: 200, data: pod };
    } catch (error) {
      return { status: 500, data: error.stack };
    }
  }

  getAllRooms() {
    return { status: 200, data: this.rooms };
  }

  getRoom(roomKey) {
    if (roomKey && this.rooms[roomKey]) {
      return { status: 200, data: this.rooms[roomKey] };
    } else {
      return { status: 400, data: "room does not exist" };
    }
  }
}

module.exports = RoomController;
