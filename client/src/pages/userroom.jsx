import React, { useEffect } from "react";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/room.css";

export default function Userroom(props) {
  return (
    <section>
      <div class="main">
        <TrackTable roomIp={props.roomIp}></TrackTable>
      </div>
    </section>
  );
}
