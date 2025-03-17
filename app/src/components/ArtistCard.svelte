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

    let { index, artistInfo } = $props();

    const handleClickArtist = () => {
        navigate(`/artist/${artistInfo.id}`);
    }

</script>
<main>
    <Card
        style="background-color: {mainColor};"
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
                >
                    play_circle
                </IconButton>
            </ActionButtons>
        </Actions>
    </Card>
</main>
<style>
    * :global(.card-media-img) {
        background-image: var(--url);
        height: 200px;
    }
</style>