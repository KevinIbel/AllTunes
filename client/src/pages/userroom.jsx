import React from 'react';
import TrackTable from '../components/trackTable/TrackTable'
import './style/room.css';

class Userroom extends React.Component {
  render() {
    return (
      <section>
        <div class="main">
        <TrackTable></TrackTable>

        </div>
        
      </section>
    );
  }
}

export default Userroom;