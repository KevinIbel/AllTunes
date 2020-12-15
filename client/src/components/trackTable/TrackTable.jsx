import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";



function formatRows(rows) {
  return rows.reduce((accumulator, currentValue) => {
    const newRow = {};
    newRow.artists = currentValue.artists.join();
    newRow.name = currentValue.name;
    accumulator.push(newRow);
    return accumulator;
  }, []);
}

const unformattedRows = [
  {
    name: "Brown Noise 355 LPF",
    artists: ["Granular"],
    uri: "spotify:track:3xsQw4CVKtM6xS9LnnRBLE",
    counter: 1,
  },
  {
    name: "Fashion Killa",
    artists: ["A$AP Rocky"],
    uri: "spotify:track:0O3TAouZE4vL9dM5SyxgvH",
    counter: 1,
  },
  {
    name: "Heat Waves",
    artists: ["Glass Animals"],
    uri: "spotify:track:6CDzDgIUqeDY5g8ujExx2f",
    counter: 1,
  },
  {
    name: "Top Down",
    artists: ["EARTHGANG"],
    uri: "spotify:track:6o2YQhGPwCdYBPpisPFInv",
    counter: 1,
  },
  {
    name: "Rainbow Bap",
    artists: ["Jaden"],
    uri: "spotify:track:0hmA5UgR7wphVWN83AVDgF",
    counter: 1,
  },
  {
    name: "Ladies, Ladies, Ladies (with JID feat. T.I.)",
    artists: ["Dreamville", "JID", "T.I."],
    uri: "spotify:track:001tGjS4WX77wtQGCP8Sfm",
    counter: 1,
  },
  {
    name: "Big Love (with EARTHGANG)",
    artists: ["Louis The Child", "EARTHGANG"],
    uri: "spotify:track:25Q6XHjKEyaXzCvKlwDpPP",
    counter: 1,
  },
  {
    name: "Levitating (feat. DaBaby)",
    artists: ["Dua Lipa", "DaBaby"],
    uri: "spotify:track:463CkQjx2Zk1yXoBuierM9",
    counter: 1,
  },
  {
    name: "10%",
    artists: ["KAYTRANADA", "Kali Uchis"],
    uri: "spotify:track:41SwdQIX8Hy2u6fuEDgvWr",
    counter: 1,
  },
  {
    name: "Freefall",
    artists: ["KAYTRANADA", "Durand Bernarr"],
    uri: "spotify:track:2flqiTbuPeDZXxgEW67rxw",
    counter: 1,
  },
  {
    name: "Oshun (with EARTHGANG & 6LACK feat. Jurdan Bryant)",
    artists: ["Spillage Village", "EARTHGANG", "6LACK", "Jurdan Bryant"],
    uri: "spotify:track:1ohxmwWvLNWIlt0kUo8kZF",
    counter: 1,
  },
  {
    name: "Good In Bed",
    artists: ["Dua Lipa"],
    uri: "spotify:track:6uAFJ75WDAoAPyCWJAtvks",
    counter: 1,
  },
  {
    name: "Opus",
    artists: ["Eric Prydz"],
    uri: "spotify:track:3v2oAQomhOcYCPPHafS3KV",
    counter: 1,
  },
  {
    name: "Glue",
    artists: ["Bicep"],
    uri: "spotify:track:2aJDlirz6v2a4HREki98cP",
    counter: 1,
  },
  {
    name: "Fukk Sleep (feat. FKA twigs)",
    artists: ["A$AP Rocky", "FKA twigs"],
    uri: "spotify:track:1AqemxWsT0iGg5Lvkm16Bt",
    counter: 1,
  },
  {
    name: "Rigamortus",
    artists: ["Kendrick Lamar"],
    uri: "spotify:track:2lD6AoA8qf2t4Dkf2TcmNK",
    counter: 1,
  },
  {
    name: "All Girls Are The Same",
    artists: ["Juice WRLD"],
    uri: "spotify:track:4VXIryQMWpIdGgYR4TrjT1",
    counter: 1,
  },
  {
    name: "White Noise - 145 hz",
    artists: ["Granular"],
    uri: "spotify:track:6H4B9gJD6eQlNoEh8q85pP",
    counter: 1,
  },
  {
    name: "Vitamin C",
    artists: ["Conducta"],
    uri: "spotify:track:2B9PMGUgEBMLubAS7Ilpue",
    counter: 1,
  },
  {
    name: "Nothing For Free",
    artists: ["Pendulum"],
    uri: "spotify:track:7eJqLdEQ96D5Xzc406xkeZ",
    counter: 1,
  },
];

const rows = formatRows(unformattedRows);

const headCells = [
    { id: "artists", label: "Artists" },
  { id: "name", label: "Track Name" },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
          >{headCell.label}</TableCell>
        ))}
        <TableCell padding="checkbox">
          <p>Button</p>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

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

export default function TrackTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow tabIndex={-1} key={row.name}>
                    <TableCell align="left">{row.artists}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell>
                      <p>button</p>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
