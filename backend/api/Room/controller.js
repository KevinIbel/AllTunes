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

  async createRoom(hostname) {
    try {
      const pod = await createPod(); //create new pod in kubernates cluster
      console.log(pod)
      var isPodRunning = false;
      while (!isPodRunning) {
        //wait until pod is ready
        isPodRunning = await isPodReady(pod.metadata.name);
      }
      console.log("pod started")

      const podIP = (await getPodIP(pod.metadata.name)) + ":8888"; //get ip address of pod
      console.log("podIP ", podIP);
      const key = await initRoom(podIP, hostname); //initalise the room with the hostname
      this.rooms[key] = await getPodData(pod.metadata.name);

      return { status: 201, data: key }; //return room key
    } catch (error) {
      return { status: 500, data: error.stack };
    }
  }

  async deleteRoom(roomKey) {
    try {
      const pod = this.rooms[roomKey];
      console.log(this.rooms[roomKey].metadata.name);
      const data = await deletePod(this.rooms[roomKey].metadata.name);
      console.log("data", data);
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
