const {
  getPodsData,
  createPod,
  deletePod,
} = require("../clients/kubernates-client/index");

const { initRoom, addCustomer, deleteRoom} = require('../clients/room-client/index');

class RoomController {
  constructor() {
    this.portsToUse = [8888];
    this.UsedPorts = [];
    this.rooms = [];
  }

  async createRoom(hostname) {
    const podName = await createPod(this.portsToUse[0]);
    this.UsedPorts[0] = this.portsToUse[0];
    while(!this.isPodReady(podName)){
      continue;
    }
    const key = await initRoom('')
    return key;
  }

  async isPodReady(podName) {
    const podStatus = await getPodsData();
    const pod = podStatus.filter((pod) => {
      return pod.metadata.name == podName ? true : false;
    })[0];
    console.log(podStatus);
    if(pod){
      return pod.status.phase == 'Running' ? true :false;
    }
  }


}

new RoomController().isPodReady("room-service-manual-pod-knslh");
module.exports = RoomController;
