<script>
    import { getRecentlyPlayed, areTracksSaved, saveTracks, removeSavedTracks } from "../clients/SpotifyClient";
    import Song from "../components/Song.svelte";
    import { assignSongId } from "../common";

    let songs = $state(null);

    const fetchRecentlyPlayed = async () => {
        const response = await getRecentlyPlayed();
        return response.items;
    };

    $effect(() => {
        const fetchSongsWrapper = async () => {
            const recentlyPlayedSongs = await fetchRecentlyPlayed();
            const trackIds = recentlyPlayedSongs.map(({ context, track }) => track.id);
            const saved = await areTracksSaved(trackIds);
            songs = recentlyPlayedSongs.map((item, index) => {
                return {
                    ...item,
                    track: {
                        ...item.track,
                        isSaved: saved[index],
                    }
                };
            });
        };

        fetchSongsWrapper();
    });

    const handleClickSaveBtnParent = async (song) => {
        if (!song.isSaved) {
            await saveTracks([song.id]);
        } else {
            await removeSavedTracks([song.id]);
        }
        song.isSaved = !song.isSaved;
    };

</script>
<div class="display-outer-container">
    <div class="display-inner-container">
        <div class="song-container">
            {#each songs as song, index (song.played_at)}
                <div>{index + 1}.</div>
                <Song
                    className={assignSongId(songs, index)}
                    songInfo={song.track}
                    handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
            {/each}
        </div>
    </div>
</div>