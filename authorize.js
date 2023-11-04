function authorizeSpotify() {
    const clientId = 'e700f259fe5e46018887d33fe46c93be';
    const redirectUri = 'http://127.0.0.1:5500/anbindung/overview.html';
    const scopes = 'user-top-read'; // Add necessary scopes

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

    window.location.href = authUrl;
}
