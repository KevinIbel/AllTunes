const axios = require("axios");
const roomServicePodDefinition = require("./room-service-pod.json");
const roomServiceServiceDefinition = require("./room-service-service.json");

const kubernatesUrl = "127.0.0.1:8001";

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
  return service.status &&
    service.status.loadBalancer &&
    service.status.loadBalancer.ingress
    ? true
    : false;
}

async function isPodReady(roomKey) {
  const pod = await getPodData(roomKey);
  return pod.status.phase == "Running" ? true : false;
}
async function getServiceIp(roomKey) {
  const service = await getServiceData(roomKey);
  return service.status.loadBalancer.ingress[0].ip;
}

async function getPodIp(roomKey) {
  const pod = await getPodData(roomKey);
  return pod.status.podIP;
}

module.exports = {
  getPodData,
  createPod,
  createService,
  deletePod,
  isPodReady,
  isServiceReady,
  getServiceIp,
  getPodIp,
};
