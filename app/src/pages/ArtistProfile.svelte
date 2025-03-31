<script>
    import { lighterMainColor, mainColor, spotifyGreen } from "../common";
    import { getArtist } from "../clients/SpotifyClient";
    import { navigate } from "svelte-routing";
    import SpotifyPlayButton from '../components/SpotifyPlayButton.svelte';

    let { artistId } = $props();
    let artistInfo = $state(null);

    const fetchArtist = async () => {
        const response = await getArtist(artistId);
        return response;
    };

    $effect(() => {
        fetchArtist().then(response => {
            artistInfo = response;
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
    {#if artistInfo}
        <div
            class="artist-profile-display"
        >
            <Image
                src={artistInfo.images[0].url}
                style="border-radius: 50%; width: 25vw; height: 55vh;"
            />
            <Paper
                style="background-color: {mainColor}; padding: 10px; margin: 10px; color: white;"
            >
                <div 
                    class="mdc-typography--headline6"
                >
                    {artistInfo.followers.total} followers
                </div>
            </Paper>
            <div
                style="display: flex; flex-direction: row;"
            >
                {#each artistInfo.genres as genre, index}
                    <Paper
                        style="background-color: {mainColor}; padding: 10px; margin: 10px; color: white;"
                    >
                        <div 
                            class="mdc-typography--headline6"
                        >
                            {genre}
                        </div>
                    </Paper>
                {/each}
            </div>
            <SpotifyPlayButton 
                text="Play on Spotify"
                style="margin-top: 10px; --spotify-green: {spotifyGreen};"
                href={artistInfo.external_urls.spotify}
                target="_BLANK"
            />
        </div>
    {/if}
</main>
<style>
    .artist-profile-display {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin-left: 200px;
    }
</style>