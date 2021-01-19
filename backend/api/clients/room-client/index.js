const axios = require("axios");

//const roomIp = "127.0.0.1:8001";

async function initRoom(roomIp, host) {
  var config = {
    method: "post",
    url: `http://${roomIp}/room`,
    data: host,
  };

  return axios(config)
    .then(function (response) {
      return response.data.key;
    })
    .catch(function (error) {
      throw error;
    });
}

async function addCustomer(roomIp, customer) {
  var config = {
    method: "post",
    url: `http://${roomIp}/room`,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

async function deleteRoom(roomIp, host) {
  var config = {
    method: "delete",
    url: `http://${roomIp}/room`,
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = { initRoom, addCustomer, deleteRoom };
