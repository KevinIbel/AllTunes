const { getPodsData, createPod, deletePod } = require('../api/clients/kubernates-client/index');
const { initRoom } = require('../api/clients/room-client');
const {}

class roomManager {

    constructor(){
        this.portsToUse = ['8888'];
        this.UsedPorts = []
        this.rooms = []
    }

    async createRoom(hostname){
        this.UsedPorts.push(this.portsToUse[0]);
        await createPod(this.portsToUse[0]);
        const key = await initRoom('127.0.0.1:' + this.portsToUse[0], hostname)
        this.rooms.push(key);
        return key;
    }

    deleteRoom(port, podName){
        await deletePod(podName)
    }
}