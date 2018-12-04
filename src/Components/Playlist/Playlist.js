import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.renderSaveButton = this.renderSaveButton.bind(this);
  }

  handleNameChange(eventObject) {
    this.props.onNameChange(eventObject.target.value)
  }

  renderSaveButton() {
    if (this.props.postStatus) {
      return <span className="Playlist-save">SAVING...</span>
    } else {
      return <span className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</span>
    }
  }

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder={'New Playlist'}
          value={this.props.playlistName}
          onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlist}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        {this.renderSaveButton()}
      </div>
    );
  }
}

export default Playlist;
