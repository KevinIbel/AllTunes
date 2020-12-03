const axios = require("axios");

//const roomIp = "127.0.0.1:8001";

async function initRoom(roomIp, hostname) {
  var config = {
    method: "post",
    url: `http://${roomIp}/room`,
    data: { hostname }
  };

  return axios(config)
    .then(function (response) {
      console.log(response.data)
      return response.data.key;
    })
    .catch(function (error) {
      console.log(error);
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
        console.log(error);
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
      console.log(error);
    });
}

module.exports = { initRoom, addCustomer, deleteRoom};
