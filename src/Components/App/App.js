import React from 'react';
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
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  addTrack(track) {
    // create copy of playlistTracks to avoid direct modification of state
    let currentPlaylistTracks = this.state.playlistTracks.map(track => track);
    if (!currentPlaylistTracks.some(savedTrack => savedTrack.id === track.id)) {
      let newPlaylistTracks = currentPlaylistTracks.push(track);
      this.setState({playlistTracks: newPlaylistTracks});
    } else {
      console.log('This track is already in your playlist');
    }
  }

  removeTrack(track) {
    // create copy of playlistTracks to avoid direct modification of state
    let updatedPlaylistTracks = this.state.playlistTracks.map(track => track);
    let trackIndex = updatedPlaylistTracks.findIndex(savedTrack => savedTrack.id === track.id);
    updatedPlaylistTracks.splice(trackIndex, 1);
    this.setState({playlistTracks: updatedPlaylistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.resetPlaylist();
  }

  resetPlaylist() {
    this.setState({
      playlistName: '',
      playlistTracks: []
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
