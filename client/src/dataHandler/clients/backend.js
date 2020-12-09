import axios from 'axios';

export async function createRoom(host) {
    var config = {
        method: 'post',
        url: 'http://localhost:8888/room',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(host)
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });      
  }