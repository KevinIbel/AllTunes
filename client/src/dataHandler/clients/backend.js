import axios from 'axios';

export async function createRoom(host) {
    let response = () => {
        return new Promise(function(resolve, reject) {
            var config = {
                method: 'post',
                url: 'http://localhost:8888/room',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify(host)
              };
              
              return axios(config)
              .then(function (response) {
                resolve(response.data);
              })
              .catch(function (error) {
                console.log(error);
              }); 
        })
    }
    return response();
  }