let accessToken = '';
const clientId = '96cb1eebc62a4c41bb8aa254b8b77eaa';
const redirectUri = 'https://jammming.netlify.com/';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    } else {
      let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expirationTimeMatch) {
        accessToken = accessTokenMatch[1];
        let expirationTime = expirationTimeMatch[1];
        window.setTimeout(function() {
          accessToken = '';
        }, expirationTime*1000);
        window.history.pushState({}, null, '/');
        return accessToken;
      } else {
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

      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${this.getAccessToken()}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log(userId);

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
