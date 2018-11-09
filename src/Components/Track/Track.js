import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction() {
    if (isRemoval) {
      return '-';
    } else {
      return '+';
    }
  }

  addTrack(track) {

  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information"> //Simply rendering the track info (name, artist, album) by accessing the props passed down by the TrackList Component
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction}</a>
      </div>
    );
  }
}

export default Track;
