let accessToken = ''; // string of characters extracted from URL provided by Spotify
const clientId = '96cb1eebc62a4c41bb8aa254b8b77eaa';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') { // access token is set
      return accessToken;
    } else { // access token is not set, so extract it from URL or Spotify server
      let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expirationTimeMatch) { // access token is not set, so extract it from URL
        accessToken = accessTokenMatch[1];
        let expirationTime = expirationTimeMatch[1];
        window.setTimeout(function() {
          accessToken = '';
        }, expirationTime*1000);
        window.history.pushState({}, null, '/');
        return accessToken;
      } else { // access token is (still) not set and also not in URL, so redirect to Spotify login
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }

    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) { //if converted JSON has tracks...
        //console.log(jsonResponse.tracks);
        return jsonResponse.tracks.items.map(track => { //mapping the converted JSON to an array of track objects
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
      }
    });
  },

  savePlaylist(name, trackURIs) {
    if (name !== '' && trackURIs !== '') { //if name and trackURIs are set
      let userId = '';
      let playlistId = '';

      //request user's Spotify username, convert response to JSON, and save to userId variable
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log(userId);

        //use returned userId to make POST request to add a new playlist on user's Spotify account, convert response to JSON, and save to playlistId variable
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            name: name
          })
        })
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        playlistId = jsonResponse.id;
        console.log(playlistId);

        //use returned userId and playlistId to make POST request to add tracks to existing playlist on user's Spotify account, convert response to JSON, and reassign to playlistId variable
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      })
    }
  }
};

export default Spotify;
