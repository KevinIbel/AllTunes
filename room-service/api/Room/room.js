const crypto = require("crypto");
const MusicManager = require("../../MusicManager/index");
const SpotifyClient = require("../../api/clients/Spotify-client/index");
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
    this.key = crypto
      .randomBytes(20)
      .toString("hex")
      .substring(0, 10)
      .toUpperCase();
    new SpotifyClient(host).getFavTracks().then((hostTracks) => {
      const reducedTrack = this.musicManager.reduceUserTracks(hostTracks);
      this.musicManager.updateAllTracks(reducedTrack);
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
      const reducedTrack = this.musicManager.reduceUserTracks(UserTracks);
      this.musicManager.updateAllTracks(reducedTrack);
      const getTrack = this.musicManager.getAllTracks();
      return getTrack;
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
      key: this.key,
      tracks: this.musicManager.getAllTracks(),
    };
  };
}

module.exports = Room;
