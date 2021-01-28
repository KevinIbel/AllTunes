class MusicManager {
  constructor() {
    this.allTracks = [];
  }

  /**
   * This function reduces the amount of information returned from spotify to just the information we need.
   * @param {Array} tracks An array of tracks given from spotify.
   */
  reduceUserTracks = (tracks) => {
    // Reduce the data to track name, artists, uri, and counter
    return tracks.reduce(function (trackAcc, currTrack) {
      var trackCover = currTrack.album.images[1].url; // 0 is a large image (640x640), 1 is medium (300x300), 2 is small (64x64)
      var name = currTrack.name;
      var uri = currTrack.uri;
      var artists = currTrack.artists.reduce(function (artistAcc, currArtist) {
        artistAcc.push(currArtist.name);
        return artistAcc;
      }, []);
      trackAcc.push({
        name: name,
        artists: artists,
        uri: uri,
        counter: 0,
        trackCover: trackCover,
      });
      return trackAcc;
    }, []);
  };

  /**
   * This function updates the music manager with a new users tracks.
   * @param {Array} userTracks  A reduced array of tracks, ensure tracks are reduced using .reduceUserTracks()
   */
  updateAllTracks = (userTracks) => {
    // For all new user tracks, if a track is a duplicate increase the existing one's counter. Otherwise add it to the array.
    for (var i = 0; i < userTracks.length; i++) {
      var duplicate = this.allTracks.find(
        (track) => track.uri == userTracks[i].uri
      );
      if (duplicate !== undefined) {
        this.allTracks[this.allTracks.indexOf(duplicate)]["counter"] =
          duplicate.counter + 1;
      } else {
        this.allTracks.push(userTracks[i]);
      }
    }
    // Tracks are sorted by their counter (number of duplicate occurances).
    this.allTracks.sort(function (a, b) {
      return b.counter - a.counter;
    });
  };

  /**
   * @returns All the tracks in the music manager.
   */
  getAllTracks = () => {
    return this.allTracks;
  };
}

module.exports = MusicManager;
