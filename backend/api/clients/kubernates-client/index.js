const axios = require("axios");
const roomServicePodDefinition = require("./room-service-pod.json");
const roomServiceServiceDefinition = require("./room-service-service.json");

const kubernatesUrl = "127.0.0.1:8001";
const nodeExternalIp = "35.242.159.208";

async function getPodData(roomKey) {
  const name = "room-service-" + roomKey.toLowerCase();
  var config = {
    method: "get",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/${name}`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function getServiceData(roomKey) {
  const name = "room-service-service-" + roomKey.toLowerCase();
  var config = {
    method: "get",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/services/${name}`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function createPod(roomKey) {
  const data = roomServicePodDefinition;
  data.metadata.labels.roomKey = roomKey;
  data.metadata.name = "room-service-" + roomKey.toLowerCase();

  var config = {
    method: "post",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function createService(roomKey) {
  const data = roomServiceServiceDefinition;
  data.metadata.name = "room-service-service-" + roomKey.toLowerCase();
  data.spec.selector.roomKey = roomKey;

  var config = {
    method: "post",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/services`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function deletePod(roomKey) {
  const name = "room-service-" + roomKey.toLowerCase();

  var config = {
    method: "delete",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/${name}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then(function (response) {
      return response.status;
    })
    .catch(function (error) {
      return error;
    });
}

async function isServiceReady(roomKey) {
  const service = await getServiceData(roomKey);
  const nodePort = service.spec.ports[0].nodePort;

  var config = {
    method: "get",
    url: `http://${nodeExternalIp}:${nodePort}/room`,
  };

  while (true) {
    await wait(500);
    let ret;
    try{
      ret = await axios(config);
    } catch(error){
      continue
    }
    if (ret && ret.status == 200) {
      return true;
    }
  }
}

async function isPodReady(roomKey) {
  const pod = await getPodData(roomKey);
  return pod.status.phase == "Running" ? true : false;
}
async function getServiceNodePort(roomKey) {
  const service = await getServiceData(roomKey);
  return service.spec.ports[0].nodePort;
}

async function getPodIp(roomKey) {
  const pod = await getPodData(roomKey);
  return pod.status.podIP;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

module.exports = {
  getPodData,
  createPod,
  createService,
  deletePod,
  isPodReady,
  isServiceReady,
  getServiceNodePort,
  getPodIp,
};
