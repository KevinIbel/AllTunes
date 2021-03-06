import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import QRCode from "react-weblineindia-qrcode-generator";
import TrackTable from "../trackTable/TrackTable";

export default function QrModal(props) {
    const url = process.env.NODE_ENV == 'development' ? "http://localhost:3000" : "http://35.246.33.106:3000"

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 550,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="qr">
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            ><div style={modalStyle} className={classes.paper}>
                    <p id="simple-modal-description">
                        <div classNamme="ttable">
                            <TrackTable></TrackTable>
                        </div>
                    </p>
                </div></Modal>
        </div>
    )
}
