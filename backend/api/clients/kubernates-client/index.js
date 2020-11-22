const axios = require("axios");

const kubernatesUrl = '127.0.0.1:8001';

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

async function increasePods(namespace, name) {
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

async function decreasePods(namespace, name) {
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

module.exports = { increasePods, decreasePods, getPodsData };
