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

    let { index, artistInfo, className } = $props();
    let spotifyPlayerContext = getContext("spotifyPlayerContext");

    const handleClickArtist = () => {
        navigate(`/artist/${artistInfo.id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        spotifyPlayerContext.artistId = artistInfo.id; 
        spotifyPlayerContext.openBottomBar = true;
        spotifyPlayerContext.albumId = null;
        spotifyPlayerContext.songId = null;
    };

</script>
<main>
    <Card
        style="background-color: {mainColor};"
        class={className}
    >
        <PrimaryAction
            onclick={handleClickArtist}
        >
            <Media
                class="card-media-img"
                style="--url: url({artistInfo.images[0].url})"
                aspectRatio="16x9"
            />
            <Content
                class="mdc-typography--body2"
            >
                {`${index}. ${artistInfo.name}`}
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