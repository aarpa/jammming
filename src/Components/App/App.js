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
      isLoading: false,
      searchResults: [],
      playlistName: '',
      playlist: [],
      isPosting: false
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToList = this.addTrackToList.bind(this);
    this.removeTrackFromList = this.removeTrackFromList.bind(this);
    this.moveTrackToSearchResults = this.moveTrackToSearchResults.bind(this);
    this.moveTrackToPlaylist = this.moveTrackToPlaylist.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }

  searchSpotify(term) {
    this.setState({isLoading: true});
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks,
        isLoading: false
      });
    });
  }

  addTrackToList(track, list) {
    // create copy of passed list to avoid direct modification of state
    if (list.some(savedTrack => savedTrack.id === track.id)) {
      return list;
    }
    let copiedList = [...list];
    copiedList.unshift(track);
    return copiedList;
  }

  removeTrackFromList(track, list) {
    // create copy of playlist to avoid direct modification of state
    let copiedList = [...list];
    let trackIndex = copiedList.findIndex(savedTrack => savedTrack.id === track.id);
    copiedList.splice(trackIndex, 1);
    return copiedList;
  }

  moveTrackToSearchResults(track) {
    let updatedResults = this.addTrackToList(track, this.state.searchResults);
    let updatedPlaylist = this.removeTrackFromList(track, this.state.playlist);
    this.setState({
        searchResults: updatedResults,
        playlist: updatedPlaylist
      });
  }

  moveTrackToPlaylist(track) {
    let updatedResults = this.removeTrackFromList(track, this.state.searchResults);
    let updatedPlaylist = this.addTrackToList(track, this.state.playlist);
    this.setState({
        searchResults: updatedResults,
        playlist: updatedPlaylist
      });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlist.map(track => track.uri);
    this.setState({isPosting: true});
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.resetPlaylist();
    });
  }

  resetPlaylist() {
    this.setState({
      playlistName: '',
      playlist: [],
      isPosting: false
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            isLoading={this.state.isLoading}
            onSearch={this.searchSpotify} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.moveTrackToPlaylist} />
            <Playlist
              postStatus={this.state.isPosting}
              playlistName={this.state.playlistName}
              playlist={this.state.playlist}
              onRemove={this.moveTrackToSearchResults}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
