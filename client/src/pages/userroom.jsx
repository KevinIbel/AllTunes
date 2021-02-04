import React from 'react';
import TrackTable from '../components/trackTable/TrackTable'
import './style/room.css';
import QRCode from "react-weblineindia-qrcode-generator";


class Userroom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        vData: "http://localhost:3000/qrcodelanding",
    };
  }

  render() {
    return (
      <section>
        <div class="main">
        <TrackTable></TrackTable>
        </div>
        <div class="qr">
          Let a user join the room! Scan below.<br></br><br></br>
          <QRCode value={this.state.vData} size={150} />
        </div>
      </section>
    );
  }
}

export default Userroom;