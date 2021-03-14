import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const style = {
    height: '100%',
    top: '0px',
    left: '0%',
    width:'auto',
    position: 'fixed',
    color: 'rgb(30 215 96)',
    textAlign: 'center',
    background: 'rgb(40, 40, 40)',
    overflowY:'scroll',

 };
 
 export default function LobbyQueue(props) {
  const [queueList, setQueueList] = useState([]);
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV === "development"
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
        if (contents.type === "queue") {
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
        <Paper>
          <TableContainer>
            <Table>
              {queueList.map((track,index) => {
                return (
                  <TableBody  key={index}>
                    <TableRow>
                      <TableCell style={{padding: '2px'}}>{track.trackCover,
                        <img
                          className="cover"
                          alt="cover"
                          style={{ width: "50px", height: "50px", objectFit: "contain" }}
                          src={track.trackCover} 
                        />}
                      </TableCell>
                      <TableCell style={{padding: '2px'}} >{track.name}, {track.artists}</TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </Paper>
    </Container>
  );
}
