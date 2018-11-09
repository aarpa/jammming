import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} onRemoval={false} /> //SearchResults passes its state (acquired from App) to TrackList Component. Key is a new prop name for the Track Component; value is the prop name used in App Component
      </div>
    );
  }
}

export default SearchResults;
