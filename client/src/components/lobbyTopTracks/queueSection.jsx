import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';

const style = {
    height: '100%',
    top: '0px',
    left: '0%',
    width:'12%',
    position: 'fixed',
    color: 'rgb(30 215 96)',
    textAlign: 'center',
    background: 'rgb(40, 40, 40)'
 };

 
 export default function LobbyQueue(props) {
  const [queueList, setQueueList] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    setWs(new WebSocket(wsUrl));
  }, [props.roomIp]);

  useEffect(() => {
    if (!ws) return;
    // Only update the rows when the message contains a queue.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type == "queue") {
          setQueueList(contents.data);
        }
      } catch (e) {
        // If the message doesn't have a queue, the rows aren't updated.
        console.log(e);
      }
    };
  }, [props.roomIp, ws]);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => {
      ws.send("QueueRequest");
    };
  }, [ws]);

  
  return (
    <Container style={style}>
      
        <h2 className={"title"}>Lobby Queue</h2>
        <Table >
        
        {queueList.map((track) => {
          return (
            <TableRow>
               <TableCell style={{padding: '2px'}}>{track.trackCover,
               <img
                        class="cover"
                        alt="cover"
                        style={{ width: "50px", height: "50px" }}
                        src={track.trackCover} 
                      />}</TableCell>
              <TableCell style={{padding: '2px'}} >{track.name}, {track.artists}</TableCell>
             
            </TableRow>
          );
          })}
          </Table>
    </Container>
  );
}
