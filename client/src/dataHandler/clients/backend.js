import axios from "axios";

const backendUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8888/room"
    : "http://35.187.88.243:8000/room";

/**
 * @param {String} host.token
 * @param {String} host.username
 */
export async function createRoom(host) {
  let response = () => {
    return new Promise(function (resolve, reject) {
      var config = {
        timeout: "90000",
        method: "post",
        url: backendUrl,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(host),
      };

      return axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  return response();
}

/**
 * @param {String} host.token
 * @param {String} host.username
 */
export async function addCustomer(customer, roomIpAddress) {
  var config = {
    method: "put",
    baseURL:
      process.env.NODE_ENV == "development"
        ? "http://localhost:8888/room"
        : "http://" + roomIpAddress + "/room",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(customer),
  };

  return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * @returns {Object} A mapping of room keys and their addresses
 */
export async function getRooms(customer) {
  let response = () => {
    return new Promise(function (resolve, reject) {
      var config = {
        method: "get",
        url: backendUrl,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(customer),
      };

      return axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  return response();
}
