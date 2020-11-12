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

async function scale() {
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
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

scale();
