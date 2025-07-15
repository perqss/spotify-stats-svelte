<script>
    import { getContext } from "svelte";

    const context = getContext("PlaybackStateContext");
    
    const chooseSrc = () => {
        if (context.songId) {
            return `https://open.spotify.com/embed/track/${context.songId}?utm_source=generator`;
        } else if (context.artistId) {
            return `https://open.spotify.com/embed/artist/${context.artistId}?utm_source=generator`;
        } else if (context.albumId) {
            return `https://open.spotify.com/embed/album/${context.albumId}?utm_source=generator`;
        }
        return '';
    };
    
</script>
<main>
    {#if context.open}
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
                src={chooseSrc()}
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Player"
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
                onclick={() => context.open = false}
                class="material-icons"
            >
                cancel
            </button>
        </div>
    {/if}
</main>