const shortTermCheckbox = document.getElementById('shortTerm');
const midTermCheckbox = document.getElementById('midTerm');
const longTermCheckbox = document.getElementById('longTerm');
const limitEle = document.getElementById('limit');
const imageUrl = 'placeholder_image_url.jpg';

const accessToken = window.location.hash.substring(1).split('&')[0].split('=')[1];
console.log(accessToken);

document.getElementById('getTopArtistsButton').addEventListener('click', function () {
    const limit = limitEle.value.toString();
    const term = document.querySelector('input[name="term"]:checked').value;

    clear();
    showAllTopArtists(term, limit);
});

document.getElementById('getTopTracksButton').addEventListener('click', function () {
    const limit = limitEle.value.toString();
    const term = document.querySelector('input[name="term"]:checked').value;

    clear();
    showAllTopTracks(term, limit);
});

function clear() {
    document.getElementById('topArtistsData').innerHTML = "";
    document.getElementById('topTracksData').innerHTML = "";
}


async function showAllTopArtists(term, limit) {
    const data = await getSpotify('https://api.spotify.com/v1/me/top/artists?time_range=' + term + '&limit=' + limit);
    const topArtistsDataDiv = document.getElementById('topArtistsData');
    topArtistsDataDiv.innerHTML = '';
    data.items.forEach(async (artist, index) => {
        const imageUrl = artist.images.length > 0 ? artist.images[0].url : 'placeholder_image_url.jpg';
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('artist-container');

        const img = document.createElement('img');
        img.src = imageUrl;

        img.addEventListener('click', function () {
            window.open('https://open.spotify.com/artist/' + artist.id);
        });

        const p = document.createElement('p');
        p.textContent = artist.name;

        containerDiv.appendChild(img);
        containerDiv.appendChild(p);
        topArtistsDataDiv.appendChild(containerDiv);
    });
}


async function showAllTopTracks(term, limit) {
    const data = await getSpotify('https://api.spotify.com/v1/me/top/tracks?time_range=' + term + '&limit=' + limit);


    const topTracksDataDiv = document.getElementById('topTracksData');
    topTracksDataDiv.innerHTML = '';

    await Promise.all(data.items.map(async (item) => {
        item.image = await getImage(item.id);
    }));

    data.items.forEach((item) => {
        const artists = item.artists.map(artist => artist.name).join(', ');

        const trackDiv = document.createElement('div');
        trackDiv.classList.add('artist-container');

        const img = document.createElement('img');
        img.src = item.image;
        img.addEventListener('click', function () {
            window.open('https://open.spotify.com/track/' + item.id);
        });
        img.classList.add('artist-container');

        const p = document.createElement('p');
        p.textContent = `${item.name} - ${artists}`;

        trackDiv.appendChild(img);
        trackDiv.appendChild(p);
        topTracksDataDiv.appendChild(trackDiv);
    });
    console.log(topTracksDataDiv);
}

async function getImage(trackID) {
    const data = await getSpotify('https://api.spotify.com/v1/tracks/' + trackID);
    return data.album.images[0].url;
}

async function getSpotify(url) {
    const response = await fetch(url, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}