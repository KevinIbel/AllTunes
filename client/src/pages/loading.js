import React, {useEffect} from 'react';
import {createRoom} from '../dataHandler/clients/backend';
import './loading.css';
import { Redirect } from 'react-router-dom';

class Loading extends React.Component {
    constructor(){
        super()
        this.state = { roomKey: null };
      }

      async componentDidMount() {
      const params = this.getHashParams();
      const token = params.access_token;
      const host = {
        token: token,
        hostname: 'kwvin'
      }
      const {key} = await createRoom(host)
      this.state.roomKey = key;
  }
    
      render() {
        if(this.state.roomKey){
          var isLoading = <Redirect to="/hostroom"></Redirect>
        } else {
          var isLoading = <div class="loadingText">The page is loading, you will be redirected shortly!</div>
        }
        return (
          <div>{isLoading}</div>
        );
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
<<<<<<< Updated upstream
  
  async componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    const host = {
      token: token,
      hostname: "kevin",
    };
    const { key } = await createRoom(host);
    this.setState({ roomKey: key });
  }

  render() {
    if (this.state.roomKey) {
      var isLoading = (
        <Redirect to={`/hostroom/#?roomKey=${this.state.roomKey}`}></Redirect>
      );
    } else {
      var isLoading = (
        <div class="loadingText">
          The page is loading, you will be redirected shortly!
        </div>
      );
    }
    return <div>{isLoading}</div>;
  }
}

export default Loading;
=======
}

export default Loading;
>>>>>>> Stashed changes
