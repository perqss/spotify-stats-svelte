<script>
    import { getArtist } from "../clients/SpotifyClient";
    import SpotifyPlayButton from "../components/SpotifyPlayButton.svelte";
    import { onMount } from "svelte";

    let { artistId } = $props();
    let artistInfo = $state(null);

    const fetchArtist = async () => {
        const response = await getArtist(artistId);
        return response;
    };

    onMount(() => {
        fetchArtist().then(response => artistInfo = response);
    });
</script>

<button 
    class="back-button material-icons" 
    onclick={() => window.history.back()}
>
    arrow_back_ios
</button>

{#if artistInfo}
    <div class="artist-profile-display">
        <img 
            src={artistInfo.images[0].url} 
            alt="Artist Cover" 
            class="artist-image"
        />
        <div class="info-card">
            <div class="info-text">
                {artistInfo.followers.total} followers
            </div>
        </div>
        <div class="genres-container">
            {#each artistInfo.genres as genre}
                <div class="info-card">
                    <div class="info-text">
                        {genre}
                    </div>
                </div>
            {/each}
        </div>

        <SpotifyPlayButton 
            href={artistInfo.external_urls.spotify} 
            target="_blank"
            text="Play on Spotify"
        />
    </div>
{/if}

<style>

.artist-profile-display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-left: 200px;
}

.artist-image {
    border-radius: 50%;
    width: 25vw;
    height: 55vh;
    object-fit: cover;
}

.info-card {
    color: white;
    margin: 5px;
    padding: 5px;
}

.info-text {
    font-size: 1.2rem;
    text-align: center;
}

.genres-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
}
</style>
