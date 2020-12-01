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
    url: `https://${kubernatesUrl}/api/v1/namespaces/default/pods/${name}`,
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

module.exports = { getPodsData, createPod, deletePod };
