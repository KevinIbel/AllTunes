const axios = require("axios");

class SpotifyClient {
  /**
   * @param {Object} customer The customer to add to the room
   * @param {string} customer.username The customers username
   * @param {string} customer.token The Authentication token of the user given by Spotify.
   */
  constructor(customer) {
    this.token = customer.token;
    this.username = customer.username;
  }

  /**
   * @returns {Array} Returns an array of all the users favorite music
   */
  getFavTracks() {
    var config = {
      method: "get",
      url: "https://api.spotify.com/v1/me/top/tracks",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    };

    return axios(config)
      .then(function (response) {
        return response.data.items;
      })
      .catch(function (error) {
        throw error;
      });
  }
}

module.exports = SpotifyClient;
