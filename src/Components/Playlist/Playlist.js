import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(eventObject) {
    this.props.onNameChange(eventObject.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder={'New Playlist'}
          value={this.props.playlistName}
          onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        <span className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</span>
      </div>
    );
  }
}

export default Playlist;
