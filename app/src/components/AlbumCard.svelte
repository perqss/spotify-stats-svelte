<script>
    import { mainColor } from '../common';
    import { navigate } from 'svelte-routing';
    import SpotifyPlayButton from '../components/SpotifyPlayButton.svelte';
    import { getContext } from 'svelte';

    let { album } = $props();
    const context = getContext("PlaybackAPIContext");

    const handleClickAlbum = () => {
        navigate(`/album/${album[1].id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        context.playAlbum(album[1].id);
    };

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<div class="artist-album-card" onclick={handleClickAlbum}>
    <img class="artist-album-image" src={album[1].image} alt={album[0]} />
    <div class="artist-album-info">
        <p class="artist-album-name">{`${album[0]}`}</p>
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
    </div>
</div>
