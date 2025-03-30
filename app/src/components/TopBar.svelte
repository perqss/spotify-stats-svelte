<script>
    import { onMount } from 'svelte';
    import { spotifyGreen, mainColor, darkerMainColor, githubUrl } from '../common';
    import { getProfile } from '../clients/SpotifyClient';
    import { Spotify } from 'svelte-bootstrap-icons';
    import { navigate } from 'svelte-routing';
  
    let profileData = $state(null);
    let showMenu = $state(false);
  
    onMount(() => {
      const getProfileWrapper = async () => {
        const response = await getProfile();
        profileData = response;
      }

      getProfileWrapper();
    });
  
    const handleLogout = () => {
      localStorage.setItem('token', undefined);
      localStorage.setItem('refresh_token', undefined);
      localStorage.setItem('token_expiration_timestamp', undefined);
      navigate('/');
    };
  
    const toggleMenu = () => {
      showMenu = !showMenu;
    };

</script>
  
<header class="top-bar">
    <div class="left-section">
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 496 512"
            fill={spotifyGreen}
            width="50"
            height="50"
        >
        <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
                d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"
            />
        </svg>
        <span class="app-title">Spotify stats - Svelte</span>
    </div>

    <div class="right-section">
        <a class="github-button" href={githubUrl} target="_blank" title="GitHub">
            GitHub
        </a>

        {#if profileData}
        <div class="profile-wrapper">
            <img
                src={profileData.images[1].url}
                alt="Profile"
                class="profile-img"
                onclick={toggleMenu}
                title="Account"
            />
            {#if showMenu}
            <div class="dropdown-menu">
                <p>{profileData.display_name}</p>
                <p>{profileData.followers.total} followers</p>
                <hr />
                <a href={profileData.external_urls.spotify} target="_blank">
                    Go to your Spotify page
                </a>
            </div>
            {/if}
        </div>
        {/if}
        <button 
            class="material-icons" 
            style="background-color: inherit;" 
            onclick={handleLogout} 
            title="Log out"
        >
            logout
        </button>
        
    </div>
</header>

<style>
    .top-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      background-color: #0f0f0f;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      gap: 12px;
      z-index: 999;
    }
  
    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
      white-space: nowrap;
    }
  
    .app-title {
      color: white;
      font-weight: bold;
    }
  
    .right-section {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-right: 3em;
    }
  
    .github-button {
      background-color: inherit;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
    }

    .github-button:hover {
        color: #807e7e;
    }
  
    .profile-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  
    .profile-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  
    .dropdown-menu {
      position: absolute;
      top: 40px;
      right: 0;
      background-color: #1e1f1e;
      color: white;
      border-radius: 6px;
      padding: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      min-width: 200px;
      z-index: 999;
    }
  
    .dropdown-menu p {
      margin: 4px 0;
    }
  
    .dropdown-menu a {
      color: white;
    }
  
    .github-button:hover {
      opacity: 0.8;
    }
</style>
  