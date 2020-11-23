import React from 'react';

const message = ({ icon, title, description }) => (
  <div>
    <div>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  </div>
);

export default message;
