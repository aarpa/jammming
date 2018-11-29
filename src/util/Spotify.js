let accessToken = '';
const clientId = '96cb1eebc62a4c41bb8aa254b8b77eaa';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') { // access token is already set
      return accessToken;
    }

    // access token is not set, so check if it exists in URL
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    // if they exist in URL, extract the access token and the expiration time
    if (accessTokenMatch && expirationTimeMatch) {
      accessToken = accessTokenMatch[1];
      let expirationTime = expirationTimeMatch[1];

      // reset access token after expiration time
      window.setTimeout(function() {
        accessToken = '';
      }, expirationTime * 1000);

       // clear out URL path
      window.history.pushState({}, null, '/');
      return accessToken;
    } else {
      // if access token doesn't exist in URL, redirect to spotify authorization page
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
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
    if (name !== '' && trackURIs !== '') {
      let userId = '';
      let playlistId = '';

      // GET request for userId
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id;

        // POST request to create playlist on user's Spotify account
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

        // POST request to add tracks to previously created playlist on Spotify account
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
