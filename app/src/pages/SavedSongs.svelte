<script>
    import { getSavedTracks, removeSavedTracks, areTracksSaved } from "../clients/SpotifyClient";
    import Song from "../components/Song.svelte";
    import { assignSongId } from "../common";

    let songs = $state(null);

    const fetchSavedTracks = async () => {
        const response = await getSavedTracks();
        return response.items;
    };

    $effect(() => {
        const fetchSavedTracksWrapper = async () => {
            const savedTracks = await fetchSavedTracks();
            const trackIds = savedTracks.map((track) => track.track.id);
            const saved = await areTracksSaved(trackIds);
            songs = savedTracks.map((item, index) => {
                return {
                    ...item.track,
                    isSaved: saved[index],
                };
            });
        };

        fetchSavedTracksWrapper();
    })

    const handleClickSaveBtnParent = async (song) => {
        await removeSavedTracks([song.id]);
        const index = songs.findIndex((s) => s.id === song.id);
        if (index !== -1) {
            songs.splice(index, 1);
        }
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
                    length={songs.length}
                    handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
            {/each}
    </div>
    </div>
</div>