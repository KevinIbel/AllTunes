import React from 'react';

import './userDetails.css';


const header = props => (
  <div className="details-container">
    <p className="user-name">Currently Logged in as: {props.display_name}{props.img}</p>
  </div>
);

export default header;
