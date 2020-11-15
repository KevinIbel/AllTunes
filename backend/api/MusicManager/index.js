class MusicManager {
  constructor() {
    this.allTracks = [];
  }

  reduceUserTracks = (data) => {
    // Reduce the data to track name, artists, uri, and counter
    return data.items.reduce(function (trackAcc, currTrack) {
        var name = currTrack.name;
        var uri = currTrack.uri;
        var artists = currTrack.artists.reduce(function (artistAcc, currArtist) {
          artistAcc.push(currArtist.name);
          return artistAcc;
        }, []);
        trackAcc.push({
          "name": currTrack.name,
          "artists": artists,
          "uri": currTrack.uri,
          "counter": 0
        });
        return trackAcc;
    }, []);
  };

  updateAllTracks = (userTracks) => {
    // For all new user tracks, if a track is a duplicate increase the existing one's counter. Otherwise add it to the array.
    for (var i=0; i<userTracks.length; i++) {
        var duplicate = this.allTracks.find(track => track.uri == userTracks[i].uri);
        if (duplicate !== undefined) {
          this.allTracks[this.allTracks.indexOf(duplicate)]["counter"] = duplicate.counter+1;
        } else {
          this.allTracks.push(userTracks[i]);
        }
    }
    // Tracks are sorted by their counter (number of duplicate occurances).
    this.allTracks.sort(function (a, b) {
        return b.counter - a.counter;
    });
  };

  getAllTracks = () => {
    return this.allTracks;
  };
}

module.exports = MusicManager;
