import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [], // Initial state. When updated, it will be an array of objects that each contain name, artist, album and id as properties, i.e. results returned from the search//
      playlistName: '', // Initial name of user's playlist -- should be a string
      playlistTracks: [] // Should be an array of objects, each containing name, artist, album and id properties
    }
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.includes(track.id)) {
      this.state.playlistTracks.push(track.id);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> //state of searchResults is passed to the SearchResults Component using corrsponding prop name
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} /> //state of user's playlist name and list of tracks is passed to Playlist Component using corresponding prop names
          </div>
        </div>
      </div>
    );
  }
}

export default App;
