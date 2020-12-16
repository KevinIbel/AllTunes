import React from "react";
import { createRoom } from "../dataHandler/clients/backend";
import "./style/loading.css";
import { Redirect } from "react-router-dom";

class Loading extends React.Component {
  constructor() {
    super();
    this.state = { roomKey: null };
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

  async componentDidMount() {
    const params = this.getHashParams();
    const token = params.access_token;
    this.setState({ ...this.state, access_token: token });
    const host = {
      token: token,
      hostname: "kevin",
    };
    const { key } = await createRoom(host);
    this.setState({ ...this.state, roomKey: key });
  }

  render() {
    var isLoading;
    if (this.state.roomKey) {
      isLoading = (
        <Redirect
          to={`/hostroom/#roomKey=${this.state.roomKey}&access_token=${this.state.access_token}`}
        ></Redirect>
      );
    } else {
      isLoading = (
        <div class="loadingText">
          The page is loading, you will be redirected shortly!
        </div>
      );
    }
    return <div>{isLoading}</div>;
  }
}

export default Loading;
