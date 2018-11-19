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
};

export default Spotify;
