const crypto = require("crypto");
const MusicManager = require("../../MusicManager/index");
const SpotifyClient = require("../clients/Spotify-client/index");
class Room {
  /**
   * @param {Object} host The host of the room
   * @param {String} host.username The username of the host
   * @param {String} host.token The Authentication token of the user given by Spotify.
   */
  constructor(host) {
    this.musicManager = new MusicManager();
    this.host = host;
    this.customers = [];
    new SpotifyClient(host).getFavTracks().then((hostTracks) => {
      const reducedTracks = this.musicManager.reduceUserTracks(hostTracks);
      this.musicManager.updateAllTracks(reducedTracks);
      this.broadcastTracks(reducedTracks);
    });
  }

  /**
   * @param {Object} customer The customer to add to the room
   * @param {string} customer.username The customers username
   * @param {string} customer.token The Authentication token of the user given by Spotify.
   */
  addCustomer = async (customer) => {
    this.customers.push(customer);
    try {
      const UserTracks = await new SpotifyClient(customer).getFavTracks();
      const reducedTracks = this.musicManager.reduceUserTracks(UserTracks);
      this.musicManager.updateAllTracks(reducedTracks);
      const updatedTracks = this.musicManager.getAllTracks();
      this.broadcastTracks(updatedTracks);
      return updatedTracks;
    } catch (error) {
      return error;
    }
  };

  /**
   * @returns {Object} All the music in the room
   */
  getMusic = () => {
    return this.musicManager.getAllTracks();
  };

  /**
   * @returns {Object} All the information about the room
   */
  listInfo = () => {
    return {
      host: this.host,
      customers: this.customers,
      tracks: this.musicManager.getAllTracks(),
    };
  };

  /**
   * @param {Array} tracks Tracks in the music manager.
   */
  broadcastTracks = (tracks) => {
    // This WS client's only purpose is to send the music manager tracks to the server then close.
    const ws = require('ws');
    const wsClient = new ws('ws://localhost:8888');

    wsClient.on('open', () => {
      console.log("WS client connected. Attempting to send music manager tracks to WS server.");
      wsClient.send(JSON.stringify(tracks));
      console.log("Finished sending. Now disconnecting.")
      wsClient.close(1000, "Tracks sent.");
    });
  };
}

module.exports = Room;
