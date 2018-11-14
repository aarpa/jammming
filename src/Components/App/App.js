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
    this.removeTrack = this.removeTrack.bind(this);
    tis.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      this.state.playlistTracks.push(track);
      this.setState(this.state);
    } else {
      console.log('This track is already in your playlist');
    }
  }

  removeTrack(track) {
    let trackIndex = this.state.playlistTracks.findIndex(savedTrack => savedTrack.id === track.id);
    this.state.playlistTracks.splice(trackIndex, 1);
    this.setState(this.state);
  }

  updatePlaylistName(name) {
    this.state.playlistName = name;
    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.state.playlistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
