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
    import SpotifyPlayButton from '../components/SpotifyPlayButton.svelte';
    import { getContext } from 'svelte';

    let { index, album } = $props();
    let spotifyPlayerContext = getContext("spotifyPlayerContext");

    const handleClickAlbum = () => {
        navigate(`/album/${album[1].id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        spotifyPlayerContext.albumId = album[1].id;
        spotifyPlayerContext.openBottomBar = true;
        spotifyPlayerContext.artistId = null;
        spotifyPlayerContext.songId = null;
    };

</script>
<main>
    <Card
        style="background-color: {mainColor};"
    >
        <PrimaryAction
            onclick={handleClickAlbum}
        >
            <Media
                class="card-media-img"
                style="--url: url({album[1].image})"
                aspectRatio="16x9"
            />
            <Content
                class="mdc-typography--body2"
            >
                {`${index}. ${album[0]}`}
            </Content>
        </PrimaryAction>
        <Actions>
            <ActionButtons>
                <IconButton
                    class="material-icons"
                    style="color: white;"
                    onclick={handleClickPlayBtn}
                >
                    play_circle
                </IconButton>
            </ActionButtons>
        </Actions>
    </Card>
</main>