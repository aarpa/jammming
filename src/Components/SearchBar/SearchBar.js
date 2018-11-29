import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(eventObject) {
    this.setState({term: eventObject.target.value});
  }

  searchSpotify() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <span onClick={this.searchSpotify}>SEARCH</span>
      </div>
    );
  }
}

export default SearchBar;
