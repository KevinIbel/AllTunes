import React from "react";
import withPlayer from "../../components/hoc/playerHoc";
import "./trackCover.css";

const trackCover = (props) => {
  let src;
  if (props.trackCover) {
    src = props.trackCover;
  } else if (props.currentSong.album) {
    src = props.currentSong.album.images[2].url;
  } else {
    src = "";
  }

  return props.currentSong.album || props.trackCover ? (
    <div className="cover" style={{ float: "left", paddingRight: "10px" }}>
      <img
        class="cover"
        alt="cover"
        style={{ width: props.size, height: props.size, padding: props.trackCover ? "5px": "" }}
        src={src}
      />
    </div>
  ) : null;
};

export default withPlayer(trackCover);
