const axios = require("axios");
const roomServiceDefinition = require("./room-service-pod.json");
const fs = require("fs");
const { Agent } = require("https");

const kubernatesUrl = "127.0.0.1:8001";

async function getPodsData() {
  var config = {
    method: "get",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
  };

  return axios(config)
    .then(function (response) {
      return response.data.items;
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
  const podStatus = await getPodsData();
  const pod = podStatus.filter((pod) => {
    return pod.metadata.name == podName ? true : false;
  })[0];
  if (pod) {
    return pod.status.phase == "Running" ? true : false;
  }
}

async function getPodIP(podName) {
  const podStatus = await getPodsData();
  const pod = podStatus.filter((pod) => {
    return pod.metadata.name == podName ? true : false;
  })[0];
  return pod.status.podIP;
}

async function getPodData(podName) {
  const podStatus = await getPodsData();
  return podStatus.filter((pod) => {
    return pod.metadata.name == podName ? true : false;
  })[0];
}


// const mockData = {
//   metadata: {
//     name: "pod-name-8888"
//   }
// }


module.exports = {
  getPodData,
  getPodsData,
  createPod,
  deletePod,
  isPodReady,
  getPodIP,
};
