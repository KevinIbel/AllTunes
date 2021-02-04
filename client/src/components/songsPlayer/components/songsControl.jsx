import React from "react";

import Button from "./controlButton";

function songsControl(props) {
  return (
    <div className="song-control">
      <Button
        onClick={() => props.shuffle(!props.shuffleActive)}
        className={"shuffle-song" + (props.shuffleActive ? " active" : "")}
        icon="fa-random"
      />
      <Button
        className="back-song"
        icon="fa-step-backward reverse"
        onClick={props.previousSong}
      />
      <Button
        className="play-btn"
        onClick={props.playing ? props.pauseSong : props.playSong}
        icon={
          "play-btn " +
          (props.playing ? "fa-pause-circle-o" : "fa-play-circle-o")
        }y
        playBtn
      />
      <Button
        className="next-song"
        icon="fa-step-forward forward"
        onClick={props.nextSong}
      />
      <Button
        onClick={() =>
          props.repeatContext(props.repeatActive ? "off" : "context")
        }
        className={"repeat-song" + (props.repeatActive ? " active" : "")}
        icon="fa-retweet"
      />
    </div>
  );
}



// function songsControl(props) {
//   return (
//   			<div className="text-center player-buttons">
// 				<button
// 					type="button"
// 					id="button_play"
// 					className="btn"
// 					onClick={() => {
// 						props.handlePlayPauseClick('play', props.token);
// 						props.emitPlayerAction('play', props.user);
// 					}}> 
// 					<i className="fa fa-play fa-lg"></i>
// 				</button>
// 				<button
// 					type="button"
// 					className="btn"
// 					onClick={() => {
// 						props.handlePlayPauseClick('pause', props.token);
// 						props.emitPlayerAction('pause', props.user);
// 					}}>
// 					<i className="fa fa-pause fa-lg"></i>
// 				</button>
// 				<button type="button" className="btn" onClick={() => {
// 					props.handleNextClick(props.token);
// 					props.emitPlayerAction('next', props.user);
// 				}}>
// 					<i className="fa fa-forward fa-lg"></i>
// 				</button>
// 			</div>
//   );
// }



export default songsControl;
