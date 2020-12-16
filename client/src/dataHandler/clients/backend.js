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

  export async function addCustomer(customer) {
    let response = () => {
        return new Promise(function(resolve, reject) {
            var config = {
                method: 'put',
                url: 'http://localhost:8888/room',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : JSON.stringify(customer)
              };
              
              return axios(config)
              .then(function (response) {
                resolve(response);
              })
              .catch(function (error) {
                console.log(error);
              }); 
        })
    }
    return response();
  }