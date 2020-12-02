import React, { Component } from 'react';
import UserDetails from '../userDetails/userDetails';

class Top extends Component {
  render = () => (
    <div>
      <UserDetails username={this.props.username} img={this.props.img} />
    </div>
  );
}

export default Top;
