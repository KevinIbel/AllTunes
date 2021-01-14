import React from "react";

import withUiActions from "../../hoc/uiHoc";
import withStatus from "../../hoc/statusHoc";
import TrackCover from "../../trackCover/trackCover";

function detailsSection(props) {
  const artists = props.artists.length;
  return (
    <div className="details-section">
      <TrackCover size={"56px"} />
      <div className="details-section-song-name">
        <p>{props.songName}</p>
      </div>
      <div className="details-section-artist-name">
        {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              key={i}
              className="artist"
              onClick={() => props.onArtistClick(artist.uri.split(":")[2])}
            >
              {artist.name}
            </span>
            {i + 1 !== artists ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default withUiActions(withStatus(detailsSection));
