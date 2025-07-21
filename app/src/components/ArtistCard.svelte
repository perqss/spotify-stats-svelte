<script>
    import { navigate } from "svelte-routing";
    import { getContext } from 'svelte';
    import { spotifyGreen } from "../common";

    let { className, artistInfo, handleClickFollowBtnParent } = $props();
    const context = getContext("PlaybackAPIContext");

    const handleClickArtist = () => {
        navigate(`/artist/${artistInfo.id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        context.playArtist(artistInfo.id);
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
            class="material-icons play-button" 
            onclick={handleClickPlayBtn} 
            title="Play"
          >
            play_circle
          </button>
          <button 
            class={`material-icons follow-button ${artistInfo.isFollowing ? 'followed' : 'not-followed'}`} 
            style="background-color: inherit; color: {artistInfo.isFollowing ? spotifyGreen : 'white'}" 
            onclick={handleClickFollowBtn}
            title="{artistInfo.isFollowing ? 'Unfollow' : 'Follow'}"
          >
            favorite
          </button>
        </div>
    </div>
</div>