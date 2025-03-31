<script>
    import { navigate } from "svelte-routing";
    import { getContext } from 'svelte';

    let { index, artistInfo, className } = $props();
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

</script>

<div class={className}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="artist-card" onclick={handleClickArtist}>
        <img class="artist-image" src={artistInfo.images[0].url} alt={artistInfo.name} />
        <div class="artist-info">
            <p class="artist-name">{`${index}. ${artistInfo.name}`}</p>
        </div>
        <button class="material-icons" style="background-color: inherit;" onclick={handleClickPlayBtn}>
            play_circle
        </button>
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