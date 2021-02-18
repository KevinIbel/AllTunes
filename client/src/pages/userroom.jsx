import React from "react";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import Modal from './modal';
import "./style/room.css";

export default function Userroom(props) {
  return (
    <section>
      <div class="main">
        <UserDetails host={true} display_name={props.display_name}></UserDetails>
        <br></br>
        <TrackTable roomIp={props.roomIp}></TrackTable>
        <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
      </div>
      <div class="qr">
		  Let a user join the room! Scan below.<br></br><br></br>
		  <button class="buttoncss" onClick={ this.selectModal }
		     >Open Modal</button>      
		     <Modal 
		         displayModal={this.state.modal}
		         closeModal={this.selectModal}
		     />
	    </div>
    </section>
    
  );
}
