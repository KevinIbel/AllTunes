# AllTunes - Spotify API Application

AllTunes is an application that allows users to join virtual rooms to share their music taste with a room host. The host views a list of compiled music from all the users in the room and can queue music to their spotify playback. 
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Running Locally
#### Prerequisites: 
Node
Available here: https://nodejs.org/en/
#### Commands: 
To run the program locally you need to open 2 terminals in the root folder of the project. 
<br>
<br>
In the first terminal.
```
cd room-service 
npm install
npm run start
```

In the second.
```
cd client
npm install
npm run start
```
Please note, every time you want to recreate a room, you will need to restart room-service.
This can be done by simply ending the process using <kbd>control</kbd> + <kbd>c</kbd>

## Deployment
To deploy this application, we the developers used google cloud, which I will detail here. However this application could be hosted on any kubernates service. 

1. Firstly create a google cloud account available [here](https://accounts.google.com/signup/v2/webcreateaccount?service=cloudconsole&continue=https%3A%2F%2Fconsole.cloud.google.com%2Fhome%2Fdashboard%3Fproject%3Dalltunes&hl=en_US&dsh=S-1660791158%3A1613582180738775&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp&nogm=true).
2. Second download the google cloud sdk [here](https://cloud.google.com/sdk/docs/install).
3. Create a kubernates cluster by following the prompts available [here](https://console.cloud.google.com/kubernetes/)
4. Login to your google cloud account by running `gcloud auth login` in a terminal
5. Once the cluster is created and up and running, click on the cluster in the UI. Then click connect. 
6. Copy and paste the command that is visible and run it in a terminal. 
7. Finally, in the route of the project run `kubectl apply -f ./kube`

Once all of these steps have been completed, the project will be running on your google cloud console.
