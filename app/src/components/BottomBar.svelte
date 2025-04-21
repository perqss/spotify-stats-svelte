<script>

    let { songId, artistId, albumId, open = $bindable() } = $props();
    
    const chooseSrc = () => {
        if (songId) {
            return `https://open.spotify.com/embed/track/${songId}?utm_source=generator`;
        } else if (artistId) {
            return `https://open.spotify.com/embed/artist/${artistId}?utm_source=generator`;
        } else if (albumId) {
            return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator`;
        }
        return '';
    };
    
</script>
<main>
    {#if open}
        <div
            style="margin-top: 100px;"
        >
            <iframe
                style="
                    position: fixed;
                    width: 100%;
                    border-radius: 12px;
                    bottom: -70px;
                "
                title="Spotify Player"
                src={chooseSrc()}
                frameborder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture loading=lazy;" 
            >
            </iframe>
            <button
                style="
                    bottom: 70px;
                    left: 0px;
                    padding: 10px;
                    position: fixed;
                    border: none;
                    background-color: inherit;
                "
                onclick={() => open = false}
                class="material-icons"
            >
                cancel
            </button>
        </div>
    {/if}
</main>