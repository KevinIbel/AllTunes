import React from "react";

import Button from "./controlButton";

//had to change the buttons to have an event on them. as I had a dom to json converting issue.
//The e event is not passed to playSong and then isn't stringified. 
function songsControl(props) {
  return (
    <div className="song-control">
      <Button
        className="back-song"
        icon="fa-step-backward reverse"
        onClick={(event1) => props.previousSong()}
      />
      <Button
        className="play-btn"
        onClick={(event2) => props.playing ? props.pauseSong() : props.playTracks()}
        icon={'play-btn ' + (props.playing ? 'fa-pause-circle-o' : 'fa-play-circle-o')}
      />;
      <Button
        className="next-song"
        icon="fa-step-forward forward"
        onClick={(event3) => props.nextSong()}
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
