import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchSearchData } from '../../../store/actions/searchActions';

import Index from './components/index/index';
import NoResults from './components/noResults/noResults';
import Results from './components/results/results';

import './search.css';

class Search extends Component {
  state = {
    mode: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ mode: '' });
    }
  }

  changeMode = mode => {
    this.setState({ mode: mode });
  };

  render = () => {
    const results =
      this.props.songs.length ||
      this.props.artists.length ||
      this.props.albums.length;

    return (
      <div >
        {!this.state.mode && !this.props.query && <Index />}
        {!this.state.mode && this.props.query && results ? (
          <Results
            changeMode={this.changeMode}
            {...this.props}
          />
        ) : null}
        {this.props.query && !results && <NoResults query={this.props.query} />}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    query: state.searchReducer.query,
    artists: state.searchReducer.artists || [],
    songs: state.searchReducer.tracks || [],
    albums: state.searchReducer.albums || []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchSearchData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
