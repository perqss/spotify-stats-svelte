<script>
    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,    
        Actions,
        ActionButtons,
    } from '@smui/card';
    import { mainColor } from '../common';
    import IconButton from '@smui/icon-button';
    import { navigate } from 'svelte-routing';
    import { getTrack } from '../clients/SpotifyClient';
    import { Image } from '@smui/image-list';
    import Typography from '@smui/typography';

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
            class="song-display"
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
                        class="mdc-typography--headline6"
                        style="margin-top: 80px"
                    >
                        {songInfo.name}
                    </div>
                </div>

            </div>
        </div>
    {/if}
</main>
<style>
    .song-display {
        display: flex;
        flex-direction: column;
        margin-left: 200px;
        height: 100vh;
    }
</style>