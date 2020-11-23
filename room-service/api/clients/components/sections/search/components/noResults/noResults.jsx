import React from 'react';

import Message from '../message/message';

const noResults = ({ query }) => (
  <Message
    title={`invalid "${query}"`}
    description="bcoz wrong srch"
  />
);

export default noResults;
