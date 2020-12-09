import React, {useEffect} from 'react';
import {createRoom} from '../dataHandler/clients/backend';
import ReactDOM from 'react-dom';
import './loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div class="loadingText">The page is loading, you will be redirected shortly!</div>
    );
  }

  async componentDidMount() {
      const params = this.getHashParams();
      const token = params.access_token;
      const host = {
        token: token,
        username: 'kwvin'
      }
      const key = await createRoom(host)
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
}

export default Loading;