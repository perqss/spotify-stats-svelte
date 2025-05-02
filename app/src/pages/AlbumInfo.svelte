<script>
    import SpotifyPlayButton from "../components/SpotifyPlayButton.svelte";
    import { navigate } from "svelte-routing";
    import Song from "../components/Song.svelte";
    import { getReleaseDateYear, parseArtists } from "../common";
    import { getAlbum, areTracksSaved, saveTracks, removeSavedTracks } from "../clients/SpotifyClient";

    const { albumId } = $props();
    let albumInfo = $state(null);

    const fetchAlbum = async () => {
        const response = await getAlbum(albumId);
        return response;
    };

    $effect(() => {
        const fetchAlbumWrapper = async () => {
            const album = await fetchAlbum();
            const songIds = album.tracks.items.map(track => track.id);
            const saved = await areTracksSaved(songIds);

            albumInfo = {
                ...album,
                tracks: {
                    ...album.tracks,
                    items: album.tracks.items.map((item, index) => ({
                        ...item,
                        isSaved: saved[index],
                    }))
                }
            };
        }

        fetchAlbumWrapper();
    });

    const handleClickSaveBtnParent = async (index) => {
        if (!albumInfo.tracks.items[index].isSaved) {
            await saveTracks([albumInfo.tracks.items[index].id]);
        } else {
            await removeSavedTracks([albumInfo.tracks.items[index].id]);
        }
        albumInfo.tracks.items[index].isSaved = !albumInfo.tracks.items[index].isSaved;
    };

</script>

<button 
    class="back-button material-icons" 
    onclick={() => window.history.back()}
>
    arrow_back_ios
</button>

{#if albumInfo}
<div class="album-display">
    <div class="album-header">
        <img 
            class="cover-display"
            src={albumInfo.images[1].url}
            alt="Album Cover"
        />

        <div class="song-album-info">
            <div class="album-title">
                {albumInfo.name}
            </div>
            <div class="album-artist">
                {parseArtists(albumInfo.artists)}
            </div>
            <div class="album-label">
                {albumInfo.label}
            </div>
            {#each albumInfo.genres as genre}
                <div class="album-genre">
                    {genre}
                </div>
            {/each}
            <div class="album-year">
                {getReleaseDateYear(albumInfo.release_date)}
            </div>
            <SpotifyPlayButton
                text="Play on Spotify"
                href={albumInfo.external_urls.spotify}
                target="_blank"
            />
        </div>
    </div>

    <div class="tracks-header">
        Album tracks
    </div>

    <div class="tracks-list">
        {#each albumInfo.tracks.items as song, index (song.id)}
            <div>{index + 1}.</div>
            <Song
                albumInfo={albumInfo}
                songInfo={song}
                handleClickSaveBtnParent={() => handleClickSaveBtnParent(index)}
            />
        {/each}
    </div>

</div>
{/if}

<style>
.album-display {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 200px;
    padding: 20px;
}

.album-header {
    display: flex;
    margin-top: 60px;
}

.album-title {
    font-size: 2rem;
    margin-top: 80px;
}

.album-artist, .album-label, .album-genre {
    font-size: 1.2rem;
    margin-top: 6px;
}

.album-year {
    font-size: 1.2rem;
    margin-top: 6px;
    margin-bottom: 20px;
}

.tracks-header {
    margin: 20px 0 10px 0;
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
}

.tracks-list {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>