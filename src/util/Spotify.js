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
      if (accessTokenMatch) { // access token is not set, so extract it from URL
        accessToken = accessTokenMatch[1];
        let expirationTime = expirationTimeMatch[1];
        window.setTimeout(function() {
          accessToken = '';
        }, expirationTime*1000);
        window.history.pushState({}, null, '/');
      } else { // access token is (still) not set and also not in URL, so redirect to Spotify login
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }

    }
  }

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) { //if converted JSON has tracks...
        console.log(jsonResponse.tracks);
        return jsonResponse.tracks.map(track => { //mapping the converted JSON to an array of track objects
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
  }
};

export default Spotify;
