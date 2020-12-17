import React from 'react';
import './style/landing.css';
import {withRouter} from 'react-router-dom';
import Modal from 'react-awesome-modal';

import querystring from "querystring";

import SpotifyWebApi from "spotify-web-api-js";

var client_id = "aeedb64c42db49bf8413aab94c44637c"; // Your client id
var client_secret = "ffdf9085c89a4cdebb7012ebdac175b4"; // Your secret
var scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state user-library-modify user-top-read';
const spotifyApi = new SpotifyWebApi();

class Landing extends React.Component {
    nextPath(path) {
        this.props.history.push(path);
      }

      constructor(props) {
        super(props);
        this.state = {
            visible : false,
            roomKey : null
        }
    }

    openModal() {
        this.setState({
            ...this.state,
            visible : true
        });
    }

    closeModal() {
        this.setState({
            ...this.state,
            visible : false
        });
    }

    login() {
      var redirect_uri = this.state.roomKey ? `http://localhost:3000/userroom/#roomKey=${this.state.roomKey}` : "http://localhost:3000/loading/";
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
                <div id="titleText" title="titleText" class="titleText">AllTunes</div><br></br><br></br>
                <div id="bodyText" title="bodyText" class="bodyText">Please choose whether you will like to create a new room as a DJ, or join a room as a Listener.</div><br></br><br></br>
                <div class="button_cont" align="center">
                  <a type="button" class="buttoncss" href="" target="_blank" rel="nofollow noopener" href={this.login()}>Host a room</a>
                </div><br></br>
                <div class="button_cont" className="btn" align="center">
                  <input class="buttoncss" target="_blank" rel="nofollow noopener" type="button" value="Join a Room" onClick={() => this.openModal()}/>
                  <Modal 
                    visible={this.state.visible}
                    width="400"
                    height="0"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <h1>Enter room key</h1>
                        <input class="key" placeholder="Room Key" onChange={event => this.setState({...this.state, roomKey : event.target.value})}></input><br></br>
                        <a href={this.login()}>Join Room</a><br></br>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                </div>
                </section>
        );
        
    }
}

export default withRouter(Landing)