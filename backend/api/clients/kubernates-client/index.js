const axios = require("axios");
const roomServiceDefinition = require("./room-service-pod.json");

const kubernatesUrl = "127.0.0.1:8001";

async function getPodData(name) {
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

async function createPod(port) {
  const data = roomServiceDefinition;
  //data.spec.containers[0].ports[0].hostPort = port;

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

async function deletePod(podName) {
  var config = {
    method: "delete",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/${podName}`,
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

async function isPodReady(podName) {
  const pod = await getPodData(podName);
  return pod.status.phase == "Running" ? true : false;
}

async function getPodIP(podName) {
  const pod = await getPodData(podName);
  return pod.status.podIP;
}

module.exports = {
  getPodData,
  createPod,
  deletePod,
  isPodReady,
  getPodIP,
};
