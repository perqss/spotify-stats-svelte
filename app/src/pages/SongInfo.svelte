<script>
    import { getReleaseDateYear, mainColor, parseArtists, grey, spotifyGreen } from '../common';
    import { navigate } from 'svelte-routing';
    import { getTrack } from '../clients/SpotifyClient';
    import SpotifyPlayButton from '../components/SpotifyPlayButton.svelte';

    let { songId } = $props();
    let songInfo = $state(null);

    const fetchSong = async () => {
        const response = await getTrack(songId);
        return response;
    };

    $effect(() => {
        fetchSong().then(response => {
            songInfo = response;
        });
    });
</script>
<main>
    <button 
        class="back-button material-icons" 
        onclick={() => window.history.back()}
    >
        arrow_back_ios
    </button>

    {#if songInfo}
        <div class="song-display">
            <div class="song-content-row">
                <img 
                    class="cover-display"
                    src={songInfo.album.images[0].url}
                    alt="Album cover"
                />
                <div class="song-details">
                    <div class="song-name">
                        {songInfo.name}
                    </div>
                    <div class="album-name">
                        {songInfo.album.name}
                    </div>
                    <div class="artist-names">
                        {parseArtists(songInfo.artists)}
                    </div>
                    <div class="release-year">
                        {getReleaseDateYear(songInfo.album.release_date)}
                    </div>
                    <SpotifyPlayButton 
                        text="Play on Spotify"
                        href={songInfo.external_urls.spotify}
                        target="_BLANK"
                    />
                </div>
            </div>
        </div>
    {/if}
</main>

<style>

.song-display {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-left: 200px;
}

.song-content-row {
    display: flex;
    flex-direction: row;
}


.song-details {
    margin-left: 20px;
    color: white;
}

.song-name {
    font-size: 2rem;
    margin-top: 80px;
}

.album-name {
    font-size: 1.5rem;
    margin-top: 8px;
}

.artist-names {
    font-size: 1.2rem;
    margin-top: 6px;
}

.release-year {
    font-size: 1.2rem;
    margin-top: 6px;
    margin-bottom: 20px;
}
</style>