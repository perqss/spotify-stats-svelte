<script>
    import List, { Item, Graphic, Text, Separator, PrimaryText, SecondaryText, Meta } from '@smui/list';
    import { navigate } from 'svelte-routing';
    import { grey, parseArtists, durationInHrMinSec } from '../common';
    import IconButton from '@smui/icon-button';
    import { getContext } from 'svelte';

    let spotifyPlayerContext = getContext("spotifyPlayerContext");
    let props = $props();

    const handleSecondary = () => {
        if (props.albumInfo) {
            return `${parseArtists(props.songInfo.artists)}`;
        } else {
            return `${parseArtists(props.songInfo.album.artists)} - ${props.songInfo.album.name}`;
        }
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        spotifyPlayerContext.songId = props.songInfo.id;
        spotifyPlayerContext.openBottomBar = true;
        spotifyPlayerContext.artistId = null;
        spotifyPlayerContext.albumId = null;
    };

    const handleSongClick = () => {
        navigate(`/song/${props.songInfo.id}`);
    };

</script>
<main>
    <Item
        onSMUIAction={handleSongClick}
    >
        <Graphic
            style="
                background-image: url({props.albumInfo ? props.albumInfo.images[1].url : props.songInfo.album.images[2].url});
                background-size: cover; 
                background-position: center;"
        />
        <Text>
            <PrimaryText 
                style="color: white;"
            >
                {props.index}. {props.songInfo.name}
            </PrimaryText>
            <SecondaryText 
                style="color: {grey};"
            >
                {handleSecondary()}
            </SecondaryText>
        </Text>
        <Meta>
            <IconButton
                class="material-icons"
                style="color: white;"
                onclick={handleClickPlayBtn}
            >
                play_circle
            </IconButton>
        </Meta>
        <div
            style="color: white;"
        >
            {durationInHrMinSec(props.songInfo.duration_ms)}
        </div>
    </Item>
    {#if props.index < props.length}
        <Separator
            style="background-color: white;"
        />
    {/if}
</main>