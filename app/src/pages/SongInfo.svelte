<script>
    import { getReleaseDateYear, mainColor, parseArtists, grey, spotifyGreen } from '../common';
    import IconButton from '@smui/icon-button';
    import { navigate } from 'svelte-routing';
    import { getTrack } from '../clients/SpotifyClient';
    import { Image } from '@smui/image-list';
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
    <IconButton
        style="top: 70px; left: 250px"
        class="material-icons"
        onclick={() => window.history.back()}
    >
        arrow_back_ios
    </IconButton>
    {#if songInfo}
        <div
            class="song-album-display"
        >
            <div
                style="display: flex; flex-direction: row;"
            >
                <Image
                    class="cover-display"
                    src={songInfo.album.images[0].url}
                />
                <div
                    style="margin-left: 1vw;"
                >
                    <div
                        class="mdc-typography--headline4"
                        style="margin-top: 80px"
                    >
                        {songInfo.name}
                    </div>
                    <div
                        class="mdc-typography--headline5"
                        style="color: {grey};"
                    >
                        {songInfo.album.name}
                    </div>
                    <div
                        class="mdc-typography--headline6"
                        style="color: {grey};"
                    >
                        {parseArtists(songInfo.artists)}
                    </div>
                    <div
                        class="mdc-typography--headline6"
                        style="color: {grey};"
                    >
                        {getReleaseDateYear(songInfo.album.release_date)}
                    </div>
                    <SpotifyPlayButton 
                        text="Play on Spotify"
                        style="margin-top: 10px; --spotify-green: {spotifyGreen};"
                        href={songInfo.external_urls.spotify}
                        target="_BLANK"
                     />
                </div>

            </div>
        </div>
    {/if}
</main>