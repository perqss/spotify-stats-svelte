<script>
    import { getTopSongs } from "../clients/SpotifyClient";
    import Song from "../components/Song.svelte";
    import { assignSongId } from "../common";

    let { songTerm } = $props();
    let songs = $state(null);

    const fetchTopSongs = async () => {
        const response = await getTopSongs(songTerm);
        return response.items;
    };

    $effect(() => {
        fetchTopSongs().then(response => songs = response);
    });

</script>
<main>
    <div
        class="display-outer-container"
    >
        <div
            class="display-inner-container"
        >
            <div class="song-container">
                {#each songs as song, index (song.id)}
                    <div class="song-index">{index + 1}.</div>
                    <Song
                        className={assignSongId(songs, index)}
                        songInfo={song}
                        length={songs.length}
                    />
                {/each}
        </div>
        </div>
    </div>
</main>