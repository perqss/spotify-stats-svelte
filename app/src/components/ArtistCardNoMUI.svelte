<script>
    import { navigate } from "svelte-routing";
    import { getContext } from 'svelte';
    import { spotifyGreen } from "../common";
    import { followArtists, unfollowArtists } from "../clients/SpotifyClient";
    console.log('render')

    let { className, artistInfo, handleClickFollowBtnParent } = $props();
    let spotifyPlayerContext = getContext("spotifyPlayerContext");

    const handleClickArtist = () => {
        navigate(`/artist/${artistInfo.id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        spotifyPlayerContext.artistId = artistInfo.id; 
        spotifyPlayerContext.openBottomBar = true;
        spotifyPlayerContext.albumId = null;
        spotifyPlayerContext.songId = null;
    };

    const handleClickFollowBtn = async (event) => {
      event.stopPropagation();
      await handleClickFollowBtnParent();
    }

</script>

<div class={className}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="artist-card" onclick={handleClickArtist}>
        <img class="artist-image" src={artistInfo.images[0].url} alt={artistInfo.name} />
        <div class="artist-info">
            <p class="artist-name">{`${artistInfo.name}`}</p>
        </div>
        <div>
          <button 
            class="material-icons" 
            style="background-color: inherit;" 
            onclick={handleClickPlayBtn} 
            title="Play"
          >
            play_circle
          </button>
          <button 
            class="material-icons follow-button" 
            style="background-color: inherit; color: {artistInfo.isFollowing ? spotifyGreen : 'white'}" 
            onclick={handleClickFollowBtn}
            title="Follow"
          >
            favorite
          </button>
        </div>
    </div>
</div>

<style>
    .artist-card {
    background-color: #121212;
    margin: 8px;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
  
  .artist-card:hover {
    background-color: #1e1e1e;
  }
  
  .artist-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .artist-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  .artist-name {
    color: white;
    font-size: 1rem;
    margin: 0;
    flex: 1;
}
</style>