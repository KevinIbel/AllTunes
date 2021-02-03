const crypto = require("crypto");
const {
  createPod,
  createService,
  deletePod,
  isServiceReady,
  getServiceIp,
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
      var isServiceGotEndPoint = false;
      while (!isServiceGotEndPoint) {
        await wait(500); //wait to reduce number of api calls made
        isServiceGotEndPoint = await isServiceReady(roomKey); //wait until the service has an endpoint
      }
      const serviceIp = (await getServiceIp(roomKey)) + ":8888"; //get ip address of pod
      await initRoom(serviceIp, host); //initialize the room
      this.rooms[roomKey] = serviceIp;
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

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

module.exports = RoomController;
