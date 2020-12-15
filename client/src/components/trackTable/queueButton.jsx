
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class queueButton extends Component {

    constructor(props) {
        super();
        this.state = {
            songuri: props.songuri
        }

    }

    componentDidMount() {
        const { access_token } = this.getHashParams();
        this.setState({ ...this.state, access_token });
      }

    queueUpSong() {
        var config = {
            method: "post",
            url: `https://api.spotify.com/v1/me/player/queue/?uri=${this.state.songuri}`,
            headers: {
                Authorization: "Bearer " + this.state.access_token,
            },
        };

        return axios(config)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                throw error;
            });
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

    render(){
    return(
        <Button onClick={() => { this.queueUpSong() }}>Queue</Button>
    );
    }


    
}

export default (queueButton);