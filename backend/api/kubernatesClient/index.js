const k8s = require("@kubernetes/client-node");
const axios = require("axios");

const cluster = {
  name: "my-server",
  server: "http://localhost:8080/",
};

const user = {
  name: "my-user",
  password: "some-password",
};

const context = {
  name: "my-context",
  user: user.name,
  cluster: cluster.name,
};

const kc = new k8s.KubeConfig();
kc.loadFromOptions({
  clusters: [cluster],
  users: [user],
  contexts: [context],
  currentContext: context.name,
});

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

async function increasePods() {
  const deployment = await (
    await k8sApi.readNamespacedDeployment("room-service", "default")
  ).response.body;
  const data = { spec: { replicas: deployment.spec.replicas + 1 } };

  var config = {
    method: "patch",
    url:
      "http://127.0.0.1:8080/apis/apps/v1/namespaces/default/deployments/room-service",
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function decreasePods() {
  const deployment = await (
    await k8sApi.readNamespacedDeployment("room-service", "default")
  ).response.body;
  const data = { spec: { replicas: deployment.spec.replicas - 1 } };

  var config = {
    method: "patch",
    url:
      "http://127.0.0.1:8080/apis/apps/v1/namespaces/default/deployments/room-service",
    headers: {
      "Content-Type": "application/strategic-merge-patch+json",
    },
    data: data,
  };

  axios(config)
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
    url: "http://127.0.0.1:8080/api/v1/namespaces/default/pods/",
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

async function deletePods(pods){
  var config = {
    method: "get",
    url: "http://127.0.0.1:8080/apis/batch/v1/namespaces/default/jobs/{name}",
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

async function terminatePod(pod){
  //this function needs to hit the pods '/' delete API
  var config = {
    method: "delete",
    url: "http://127.0.0.1:8888/",
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

getPodsData();
terminatePod();

module.exports = { increasePods, decreasePods, getPodsData };
