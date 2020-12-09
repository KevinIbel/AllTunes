const {
  getPodData,
  createPod,
  deletePod,
  isPodReady,
  getPodIP,
} = require("../clients/kubernates-client/index");

const {
  initRoom,
} = require("../clients/room-client/index");

class RoomController {
  constructor() {
    this.rooms = {};
  }

  async createRoom(host) {
    try {
      const pod = await createPod(); //create new pod in kubernates cluster
      console.log(pod)
      var isPodRunning = false;
      while (!isPodRunning) {
        //wait until pod is ready
        isPodRunning = await isPodReady(pod.metadata.name);
      }
      await wait(5000);
      const podIP = (await getPodIP(pod.metadata.name)) + ":8888"; //get ip address of pod
      const key = await initRoom(podIP, host); //initalise the room with the hostname
      this.rooms[key] = await getPodData(pod.metadata.name);
      return { status: 201, data: key }; //return room key
    } catch (error) {
      return { status: 500, data: error.stack };
    }
  }

  async deleteRoom(roomKey) {
    try {
      const pod = this.rooms[roomKey];
      const data = await deletePod(this.rooms[roomKey].metadata.name);
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
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = RoomController;
