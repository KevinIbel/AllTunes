import axios from 'axios';

const backendUrl = process.env.NODE_ENV == 'development' ? "http://localhost:8888/room" : "http://35.187.88.243:8000/room"
console.log(process.env.NODE_ENV)

export async function createRoom(host) {
    let response = () => {
        return new Promise(function(resolve, reject) {
            var config = {
                method: 'post',
                url: backendUrl,
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
                url: backendUrl,
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