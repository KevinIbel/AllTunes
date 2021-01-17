import React, { useState } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import UserDetails from "../components/userDetails/userDetails";
import UserSection from "../components/userSection/userSection";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";


  export default function Joinroom(props) {
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [access_token, setAccess_token] = useState(props.access_token);
    const [roomKey, setRoomKey] = useState(props.roomKey);
  
    useState(() => {
      setAccess_token(props.access_token);
      setToken(props.access_token);
    }, props.access_token);
  
    useState(() => {
      setRoomKey(props.roomKey);
    }, props.roomKey);
    return (
      
      <section>
        <div class="main">
        <TrackTable
        host={false}
      ></TrackTable>
      <UserSection
      host={true}
      >
      </UserSection>

        </div>
        
      </section>
    );
  }


