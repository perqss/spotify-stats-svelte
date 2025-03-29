import { spotify } from "./main"

export const spotifyGreen = '#1DB954'
export const mainColor = '#1e1f1e'
export const lighterMainColor = '#2f302f'
export const darkerMainColor = '#0f0f0f'
export const grey = '#b5b2b1'

export const scopes = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state'
  ];
export const clientId = '9c88dffd7e78491caff363351d140da0';
export const authEndPoint = 'https://accounts.spotify.com/authorize';
let frontendUrl = '';
import.meta.env.DEV ? frontendUrl = 'http://127.0.0.1:5173/' : frontendUrl = 'http://127.0.0.1:4173/';
export const LOAD_AT_ONCE_LIMIT = 99;
export const OFFSET = 49;
export const githubUrl = 'https://github.com/perqss/spotify-stats-app';

export const durationInHrMinSec = (duration) => {
    let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    let result;
    hours === '00' ? result = minutes + ':' + seconds : result = hours + ':' + minutes + ':' + seconds;
    return result;
};

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const parseArtists = (artistsInfo) => {
    const artists = artistsInfo.map(artistInfo => artistInfo.name);
    return artists.join(', ');
};

export const getReleaseDateYear = (releaseDate) => {
    return releaseDate.substring(0, 4);
  };

export const getCodeFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    return code;
};

const EXPIRATION_TIME = 3600 * 1000;

export const setLocalAccessToken = (token) => {
    localStorage.setItem('token', token);
};

export const setLocalRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token);
};

export const getLocalAccessToken = () => {
    return localStorage.getItem('token');
};

export const getLocalRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};

export const setExpirationTimestamp = () => {
	const time = new Date(Date.now() + EXPIRATION_TIME).getTime(); // add 1 hour to current time
	localStorage.setItem('token_expiration_timestamp', time);
};

export const getExpirationTimestamp = () => {
    return localStorage.getItem('token_expiration_timestamp');
};

export const checkIfTokenHasExpired = async () => {
    const time = new Date(Date.now()).getTime();
    if (getExpirationTimestamp() <= time) {
        await getRefreshToken();
    }
};

export const getTokens = async (code) => {
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: frontendUrl,
            code_verifier: localStorage.getItem('code_verifier'),
        }),
    }

    const response = await fetch(url, payload);
    const responseJson = await response.json();
    setLocalAccessToken(responseJson.access_token);
    setExpirationTimestamp();
    setLocalRefreshToken(responseJson.refresh_token);
    spotify().setAccessToken(responseJson.access_token);
};

export const getRefreshToken = async () => {

    // refresh token that has been previously stored
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: getLocalRefreshToken(),
         client_id: clientId
       }),
     }

    const response = await fetch(url, payload);
    const responseJson = await response.json();
     
    setLocalAccessToken(responseJson.access_token);
    setExpirationTimestamp();
    setLocalRefreshToken(responseJson.refresh_token);
    spotify().setAccessToken(responseJson.access_token);
};

export const getLoginUrl = async () => {

    const generateRandomString = (length) => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }
    
    const codeVerifier  = generateRandomString(64);

    window.localStorage.setItem('code_verifier', codeVerifier);

    const sha256 = async (plain) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(plain)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    }

    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${frontendUrl}&scope=${scopes.join("%20")}&response_type=code&show_dialog=true
    &code_challenge_method=S256&code_challenge=${codeChallenge}`;

    return loginUrl;
}