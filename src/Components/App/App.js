import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.state.searchResults = tracks;
      this.setState(this.state);
    });
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

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.state.playlistName = '';
    this.state.playlistTracks = [];
    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
