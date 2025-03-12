<script>
  import svelteLogo from '../assets/svelte.svg'
  import viteLogo from '/vite.svg';
  import Button from '@smui/button';
  import { spotifyGreen, getLoginUrl, getCodeFromUrl, getTokens } from '../common';
  import { onMount } from 'svelte';
  //import { Query } from "@mateothegreat/svelte5-router";
  import { navigate } from 'svelte-routing';

  let loginUrl = "";
  onMount(() => {
    const code = getCodeFromUrl();
    console.log(code)

    const afterLogIn = async () => {
      await getTokens(code);
      navigate('/top-artists');
    };

    const setLoginUrl = async () => {
      const url = await getLoginUrl();
      loginUrl = url;
    };

    code ? afterLogIn() : setLoginUrl();
  })

</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  {#if loginUrl}
    <Button
      href={loginUrl}
      class="login-button"
      variant="raised"
      style="--spotify-green: {spotifyGreen}"
    >
      Log in with Spotify
    </Button>
  {/if}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  * :global(.login-button) {
    margin: 5vh;
    background-color: var(--spotify-green);
    color: black;
  }

  * :global(.login-button):hover {
    background-color: #68bd72;
  }

</style>
