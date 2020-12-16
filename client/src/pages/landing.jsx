import React from "react";
import { withRouter } from "react-router-dom";
import querystring from "querystring";
import "./style/landing.css";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var scope =
  "streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-modify user-top-read";

class Landing extends React.Component {
  login(customer) {
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

  render() {
    return (
      <section>
        <div id="titleText" title="titleText" class="titleText">
          AllTunes
        </div>
        <br></br>
        <br></br>
        <div id="bodyText" title="bodyText" class="bodyText">
          Please choose whether you will like to create a new room as a DJ, or
          join a room as a Listener.
        </div>
        <br></br>
        <br></br>
        <div class="button_cont" align="center">
          <a
            type="button"
            class="buttoncss"
            rel="nofollow noopener"
            href={this.login("host")}
          >
            Host a room
          </a>
        </div>
        <br></br>
        <div class="button_cont" align="center">
          <a
            type="button"
            class="buttoncss"
            rel="nofollow noopener"
            href={this.login("joiner")}
          >
            Join a room
          </a>
        </div>
      </section>
    );
  }
}

export default withRouter(Landing);
