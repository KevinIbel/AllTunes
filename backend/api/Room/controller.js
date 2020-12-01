const {
  getPodsData,
  createPod,
  deletePod,
} = require("../clients/kubernates-client/index");

const {
  initRoom,
  addCustomer,
  deleteRoom,
} = require("../clients/room-client/index");

class RoomController {
  constructor() {
    this.portsToUse = [8888];
    this.UsedPorts = [];
    this.rooms = [];
  }

  async createRoom(hostname) {
    try {
      const pod = await createPod(this.portsToUse[0]);
      this.UsedPorts[0] = this.portsToUse[0];
      var isPodReady = await this.isPodReady(pod.metadata.name);
      console.log(isPodReady);
      while (!isPodReady) {
        console.log(isPodReady);
        isPodReady = await this.isPodReady(pod.metadata.name);
      }
      const podIP = await this.getPodId(pod.metadata.name);
      console.log("podId", podIP);
      const key = await initRoom(podIP, hostname);
      return {podId, isPodReady, key};
    } catch (error) {
      return error;
    }
  }

  async isPodReady(podName) {
    const podStatus = await getPodsData();
    const pod = podStatus.filter((pod) => {
      return pod.metadata.name == podName ? true : false;
    })[0];
    if (pod) {
      console.log(pod.status.phase);
      return pod.status.phase == "Running" ? true : false;
    }
  }

  async getPodId(podName) {
    const podStatus = await getPodsData();
    const pod = podStatus.filter((pod) => {
      return pod.metadata.name == podName ? true : false;
    })[0];
    console.log("pod", pod);
    return pod.status.podIP;
  }
}

module.exports = RoomController;
