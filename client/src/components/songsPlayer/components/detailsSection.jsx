import React from "react";
import withUiActions from "../../hoc/uiHoc";
import withStatus from "../../hoc/statusHoc";
import TrackCover from "../../trackCover/trackCover";


function detailsSection(props) {
  const artists = props.artists.length;
  return (
    <div className="details-section">
           <div className="details-section-track-cover">
      <TrackCover size={"52px"} />
      </div>
      <div  className="details-section-song-name">
        <p>{props.songName}</p>
      </div>
      <div className="details-section-artist-name">
        {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              key={i}
              className="artist"
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
