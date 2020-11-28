const axios = require("axios");
const roomServiceDefinition = require("./room-service-pod.json");

const kubernatesUrl = "localhost:8001";

async function getJob(namespace, name) {
  var config = {
    method: "get",
    url: `http://${kubernatesUrl}/apis/batch/v1/namespaces/${namespace}/jobs/${name}`,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function increaseJobs(namespace, name) {
  const job = await getJob(namespace, name);

  const data = { spec: { parallelism: job.spec.parallelism + 1 } };
  console.log(data);

  var config = {
    method: "patch",
    url: `http://${kubernatesUrl}/apis/batch/v1/namespaces/${namespace}/jobs/${name}`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function decreaseJobs(namespace, name) {
  const job = await getJob(namespace, name);

  const data = { spec: { parallelism: job.spec.parallelism - 1 } };
  console.log(data);

  var config = {
    method: "patch",
    url: `http://${kubernatesUrl}/apis/batch/v1/namespaces/${namespace}/jobs/${name}`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getPodsData() {
  var config = {
    method: "get",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/`,
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.items);
      return response.data.items;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function createPod(port) {
  const data = roomServiceDefinition;
  data.spec.containers[0].ports[0].hostPort = port;

  var config = {
    method: "post",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.metadata.name);
      return response.data.metadata.name;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function deletePod(podName) {
  var config = {
    method: "delete",
    url: `http://${kubernatesUrl}/api/v1/namespaces/default/pods/${name}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      return response.status;
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = { getPodsData, createPod, deletePod };
