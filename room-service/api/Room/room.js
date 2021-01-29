const crypto = require("crypto");
const MusicManager = require("../../MusicManager/index");
const SpotifyClient = require("../clients/Spotify-client/index");
//Pushing to master.

class Room {

  /**
   * @param {Object} host The host of the room
   * @param {String} host.token The Authentication token of the user given by Spotify.
   * @param {String} host.hostname The username of the host
   * @param {String} host.hostid The hosts Spotify ID.
   */
  constructor(host) {
    this.musicManager = new MusicManager();
    this.host = host;
    this.customers = {};
    this.key = crypto
      .randomBytes(20)
      .toString("hex")
      .substring(0, 10)
      .toUpperCase();
    new SpotifyClient(host).getFavTracks().then((hostTracks) => {
      const reducedTracks = this.musicManager.reduceUserTracks(hostTracks);
      this.musicManager.updateAllTracks(reducedTracks);
      this.broadcastTracks(reducedTracks);
      this.customers[host.hostid] = host.hostname;
      this.broadcastPeople(this.customers);
    });
  }

  /**
   * @param {Object} customer The customer to add to the room
   * @param {string} customer.token The Authentication token of the user given by Spotify.
   * @param {string} customer.username The customers username
   * @param {string} customer.userid The customers Spotify ID.
   */

   //getCustomerName = async (customer) => {
    //this.customer.username(getUserProfile())
   
   //};


  addCustomer = async (customer) => {
    try {
      // Check if the user has already joined the room.
        if (!Object.keys(this.customers).includes(customer.userid)){
          // Update the tracks and userlist in the room.
          const UserTracks = await new SpotifyClient(customer).getFavTracks(); 
          const reducedTracks = this.musicManager.reduceUserTracks(UserTracks);
          this.musicManager.updateAllTracks(reducedTracks);
          // Update the people in the room and send the updated list to everyone in the room.
          this.customers[customer.userid] = customer.username;
        }
        const roomTracks = this.musicManager.getAllTracks()
        this.broadcastTracks(roomTracks);
        this.broadcastPeople(this.customers);
        return roomTracks;
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

  /**
   * @param {Object} customer The customer to add to the room
   * @returns {Object} All the music in the room
   */
  addTracks = async (customer) => {
    const UserTracks = await new SpotifyClient(customer).getFavTracks();
    const reducedTracks = this.musicManager.reduceUserTracks(UserTracks);
    this.musicManager.updateAllTracks(reducedTracks);
    const updatedTracks = this.musicManager.getAllTracks();
    this.broadcastTracks(updatedTracks);
    return updatedTracks
  }

  /**
   * @param {Array} tracks Tracks in the music manager.
   */
  broadcastTracks = async (tracks) => {
    setTimeout(function () {
      // This WS client's only purpose is to send the music manager tracks to the server then close.
      const ws = require('ws');
      const wsClient = new ws('ws://localhost:8888');

      wsClient.on('open', () => {
        console.log("WS client connected. Attempting to send music manager tracks to WS server.");
        const messageToSend = { type: "tracks", data: tracks }
        wsClient.send(JSON.stringify(messageToSend));
        console.log("Finished sending. Now disconnecting.")
        wsClient.close(1000, "Tracks sent.");
      });
    }, 100);
  };

  /**
   * @param {Array} people People in the room.
   */
  broadcastPeople = async (people) => {
    setTimeout(function () {
      // This WS client's only purpose is to send the names of the people in the room to the server then close.
      const ws = require('ws');
      const wsClient = new ws('ws://localhost:8888');

      wsClient.on('open', () => {
        console.log("WS client connected. Attempting to send the user list of the room to WS server.");
        const messageToSend = { type: "userlist", data: people }
        wsClient.send(JSON.stringify(messageToSend));
        console.log("Finished sending. Now disconnecting.")
        wsClient.close(1000, "User list sent.");
      });
    }, 100);
  };
}

module.exports = Room;
