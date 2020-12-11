import React, { Component } from 'react';
import { connect } from 'react-redux';
import Top from '../../components/topBar/Top';
import PlayBox from '../../components/playBox/playBox';

class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    console.log(name);
    let img = this.props.user.display_picture;
    console.log(img);
    let id = this.props.user.id;
    console.log(id);
      
    return (
      <div className="main-section">
        <Top username={name || id} dp={img} />
        <div className="main-section-container">
        </div>
        <PlayBox/>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    view: state.uiReducer.view
  };
};

export default connect(mapStateToProps)(MainSection);
