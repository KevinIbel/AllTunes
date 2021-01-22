import React from "react";
import querystring from "querystring";
import "./style/landing.css";
import Container from "@material-ui/core/Container";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var scope =
  "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-modify user-top-read user-follow-modify";

export default function Landing(props) {
  function login(customer) {
    var redirect_uri;
    if (customer === "host") {
      redirect_uri = "http://localhost:3000/loading/";
    } else {
      redirect_uri = "http://localhost:3000/userloading/";
    }
    var redirect =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "token",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      });
    return redirect;
  }

  return (
    <Container fixed>
      <div id="titleText" title="titleText" className="titleText">
        AllTunes
      </div>
      <div className="button_cont">
        <a type="button" className="buttoncss" href={login("host")}>
          Host a room
        </a>
        <a type="button" className="buttoncss" href={login("joiner")}>
          Join a room
        </a>
      </div>
    </Container>
  );
}