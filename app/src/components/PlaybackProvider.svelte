<script>
    import { setContext } from "svelte";

    let { children } = $props();

    const state = $state({
        songId: null, artistId: null, albumId: null, open: false
    });

    const api = {
        playArtist: id => { state.songId = null; state.albumId = null; state.artistId = id; state.open = true; },
        playSong:   id => { state.songId = id; state.albumId = null; state.artistId = null; state.open = true; },
        playAlbum:  id => { state.songId = null; state.albumId = id; state.artistId = null; state.open = true; }
    };

    setContext("PlaybackAPIContext", api);
    setContext("PlaybackStateContext", state);
</script>

{@render children()}