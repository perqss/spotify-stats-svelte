<script>
    import { getTopSongs, areTracksSaved, saveTracks, removeSavedTracks } from "../clients/SpotifyClient";
    import Song from "../components/Song.svelte";
    import { assignSongId } from "../common";

    let { songTerm } = $props();
    let songs = $state([]);

    const fetchTopSongs = async () => {
        const response = await getTopSongs(songTerm);
        return response.items;
    };

    $effect(() => {
        const fetchSongsWrapper = async () => {
            const topSongs = await fetchTopSongs();
            const trackIds = topSongs.map((track) => track.id);
            const saved = await areTracksSaved(trackIds);
            songs = topSongs.map((item, index) => {
                return {
                    ...item,
                    isSaved: saved[index],
                };
            });
        };

        fetchSongsWrapper();
    });

    const handleClickSaveBtnParent = async (song) => {
        if (!songs.isSaved) {
            await saveTracks([song.id]);
        } else {
            await removeSavedTracks([song.id]);
        }
        song.isSaved = !song.isSaved;
        //songs = songs.map((s) => s.id === song.id ? { ...s, isSaved: !song.isSaved } : s);
    };

</script>
<div
    class="display-outer-container"
>
    <div
        class="display-inner-container"
    >
        <div class="song-container">
            {#each songs as song, index (song.id)}
                <div>{index + 1}.</div>
                <Song
                    className={assignSongId(songs, index)}
                    songInfo={song}
                    handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
            {/each}
    </div>
    </div>
</div>