const MusicManager = require("../../MusicManager/index");
const SpotifyClient = require("../clients/Spotify-client/index");
const ws = require("ws");
class Room {
  /**
   * @param {Object} host The host of the room
   * @param {String} host.token The Authentication token of the user given by Spotify.
   * @param {String} host.username The username of the host
   * @param {String} host.hostId The hosts Spotify ID.
   */
  constructor(host) {
    this.musicManager = new MusicManager();
    this.host = host;
    this.customers = [];
    this.timer = null;
    this.remainder = 1;
    new SpotifyClient(host).getFavTracks().then((hostTracks) => {
      const reducedTracks = this.musicManager.reduceUserTracks(hostTracks);
      this.musicManager.updateAllTracks(reducedTracks);
      this.customers.push({
        displayName: host.username,
        userId: host.hostId,
        host: true,
      });
      this.broadcastChanges({
        type: "tracks",
        data: this.musicManager.getAllTracks(),
      });
      this.broadcastChanges({ type: "lobby", data: this.customers });
    });
  }

  /**
   * @param {Object} customer The customer to add to the room
   * @param {string} customer.token The Authentication token of the user given by Spotify.
   * @param {string} customer.username The customers username
   * @param {string} customer.userid The customers Spotify ID.
   */

  addCustomer = async (customer) => {
    try {
      // Check if the user has already joined the room.
      if (!Object.keys(this.customers).includes(customer.userid)) {
        // Update the tracks and userlist in the room.
        const UserTracks = await new SpotifyClient(customer).getFavTracks();
        const reducedTracks = this.musicManager.reduceUserTracks(UserTracks);
        this.musicManager.updateAllTracks(reducedTracks);
        // Update the people in the room and send the updated list to everyone in the room.
        this.customers.push({
          displayName: customer.username,
          userId: customer.userid,
        });
      }
      const roomTracks = this.musicManager.getAllTracks();
      this.broadcastChanges({ type: "tracks", data: roomTracks });
      this.broadcastChanges({ type: "lobby", data: this.customers });
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
      tracks: this.musicManager.getAllTracks(),
    };
  };

  getTracks() {
    return this.musicManager.getAllTracks();
  }

  getLobby() {
    return this.customers;
  }

  /**
   * @param {Object} track The track to add to the play queue.
   * @returns All the tracks in the play queue after updating.
   */
  addToQueue = (track) => {
    this.musicManager.addToQueue(track);
    return this.musicManager.getQueue();
  }

  /**
   * @returns All the tracks in the play queue.
   */
  getQueue() {
    return this.musicManager.getQueue();
  };

  getNextSong() {
    return this.musicManager.getNextSong();
  };

  getSongAtPos() {
    return this.musicManager.getSongAtPos();
  };

  setSongPos = (progressMS) => {

    const temp = this.musicManager.setSongPos(progressMS)
    return temp;
  };

  broadcastChanges(data) {
    const wsClient = new ws("ws://localhost:8888");
    wsClient.on("open", () => {
      const messageToSend = { message: "broadcast", ...data };
      wsClient.send(JSON.stringify(messageToSend));
      wsClient.close(1000, "Tracks sent.");
    });
  }

  decrementUpdate = () => {
    this.remainder--;
    if (this.remainder < 0) {
      clearInterval(this.timer)
      this.musicManager.getNextSong();
      this.playNextSong();
      this.notifyQueueUpdate();
    }
  }

  setNextSongTimer = (duration_ms, positionMS) => {
    if (this.musicManager.getQueue().length > 0) {
      this.remainder = (duration_ms - positionMS)/1000;
      this.timer = setInterval(this.decrementUpdate, 1000);
    }
  }

  clearNextSongTimer = () => {
    clearInterval(this.timer);
  }

  playNextSong() {
    const wsClient = new ws("ws://localhost:8888");
    wsClient.on("open", () => {
      wsClient.send("PlayRequest");
      wsClient.close(1000, "PlayRequest sent.");
    });
  }

  notifyQueueUpdate() {
    const wsClient = new ws("ws://localhost:8888");
    wsClient.on("open", () => {
      wsClient.send("QueueUpdate");
      wsClient.close(1000, "QueueUpdate sent.");
    });
  }

}

module.exports = Room;
