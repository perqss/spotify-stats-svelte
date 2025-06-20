<script>
    import { navigate } from "svelte-routing";
    import { getContext } from 'svelte';
    import { spotifyGreen } from "../common";
    import { followArtists, unfollowArtists } from "../clients/SpotifyClient";

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
      await handleClickFollowBtnParent(artistInfo);
    };

</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={`${className} artist-card`}>
    <div class="artist-album-card" onclick={handleClickArtist}>
        <img class="artist-album-image" src={artistInfo.images[0].url} alt={artistInfo.name} />
        <div class="artist-album-info">
            <p class="artist-album-name">{`${artistInfo.name}`}</p>
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
            title="{artistInfo.isFollowing ? 'Unfollow' : 'Follow'}"
          >
            favorite
          </button>
        </div>
    </div>
</div>