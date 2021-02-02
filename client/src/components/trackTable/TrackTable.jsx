import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import QueueButton from "../trackTable/queueButton";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import TrackCover from "../trackCover/trackCover";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function TrackTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
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
    // Only update the rows when the message contains tracks.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type == "tracks") {
          setRows(formatRows(contents.data));
        }
      } catch (e) {
        // If the message doesn't have tracks, the rows aren't updated.
        console.log(e);
      }
    };
  }, [props.roomIp, ws]);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => {
      ws.send("TracksRequest");
    };
  }, [ws]);

  function formatRows(rows) {
    rows.length = 100;
    return rows.reduce((accumulator, currentValue) => {
      const newRow = {};
      newRow.artists = currentValue.artists.join(", ");
      newRow.name = currentValue.name;
      newRow.uri = currentValue.uri;
      newRow.trackCover = currentValue.trackCover;
      accumulator.push(newRow);
      return accumulator;
    }, []);
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow tabIndex={-1} key={row.name}>
                    <TableCell align="left" padding={"none"}>
                      <TrackCover
                        trackCover={row.trackCover}
                        size={"75px"}
                      ></TrackCover>
                    </TableCell>
                    <TableCell align="left">{row.artists}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    {props.host ? (
                      <TableCell padding="checkbox">
                        <div style={{ paddingRight: "10px" }}>
                          {props.roomKey && props.access_token ? (
                            <QueueButton
                              songuri={row.uri}
                              roomKey={props.roomKey}
                              access_token={props.access_token}
                            ></QueueButton>
                          ) : null}
                        </div>
                      </TableCell>
                    ) : (
                      <div></div>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
