function authorizeSpotify() {
    const clientId = 'e700f259fe5e46018887d33fe46c93be';
    const redirectUri = 'https://eren-a.github.io/spotify-stats/authorized.html';
    const scopes = 'user-top-read'; // Add necessary scopes

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

    window.location.href = authUrl;
}
