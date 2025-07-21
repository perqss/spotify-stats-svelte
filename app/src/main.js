import { mount } from 'svelte'
import './app.css'
import App from './App.svelte';
import Spotify from 'spotify-web-api-js';
import { getLocalAccessToken } from './common';

const s = new Spotify();

export const spotify = () => {
  s.setAccessToken(getLocalAccessToken());
  return s;
};

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app;
