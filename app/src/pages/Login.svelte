<script>
  import logo from '../assets/svelte.svg?inline'
  import { getLoginUrl, getCodeFromUrl, getTokens } from '../common';
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  let loginUrl = $state("");

  onMount(() => {
    const code = getCodeFromUrl();

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

<div class="App">
  <header class="App-header">
    <img src={logo} class="logo" alt="logo" />
    {#if loginUrl} 
        <a 
          href={loginUrl}
          class="login-button"
        >
            Log in with Spotify
        </a>
    {/if}
  </header>
</div>

<style>
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
  
.App {
    text-align: center;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter, transform;
    transition: filter 300ms;
    animation: spin 20s linear infinite;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

@keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
}

.login-button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    color: white;
}

.login-button:hover {
    border-color: #666666;
    color: white;
}
.login-button:focus,
.login-button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

</style>
