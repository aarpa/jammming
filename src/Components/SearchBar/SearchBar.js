import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSearchButton = this.renderSearchButton.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  renderSearchButton() {
    if (this.props.isLoading) {
      return <span>SEARCHING...</span>
    } else {
      return <span onClick={this.searchSpotify}>SEARCH</span>
    }
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
        {this.renderSearchButton()}
      </div>
    );
  }
}

export default SearchBar;
