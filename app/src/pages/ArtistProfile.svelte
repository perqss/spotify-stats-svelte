<script>
    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,    
        Actions,
        ActionButtons,
    } from '@smui/card';
    import { lighterMainColor, mainColor, spotifyGreen } from "../common";
    import { getArtist } from "../clients/SpotifyClient";
    import Paper from '@smui/paper';
    import IconButton from "@smui/icon-button";
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
            <Card>
                <Media 
                    class="card-media-img"
                    style="--url: url({artistInfo.images[0].url})"
                    aspectRatio="16x9"
                />
            </Card>
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
    * :global(.card-media-img) {
        background-image: var(--url);
        width: 25vw;
        height: 55vh;
    }
</style>