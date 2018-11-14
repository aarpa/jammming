import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      <a className="Track-action" onClick={this.removeTrack}>'-'</a>
    } else {
      <a className="Track-action" onClick={this.addTrack}>'+'</a>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information"> //Simply rendering the track info (name, artist, album) by accessing the props passed down by the TrackList Component
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action"></a> // + or - will go here
      </div>
    );
  }
}

export default Track;
