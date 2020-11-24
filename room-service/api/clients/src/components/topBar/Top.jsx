import React, { Component } from 'react';

import UserDetails from '../userDetails/userDetails';
import Search from '../trackSearch/trackSearch';


class Top extends Component {
  render = () => (
    <div>
      <Search />
      <UserDetails username={this.props.username} img={this.props.img} />
    </div>
  );
}

export default Top;
