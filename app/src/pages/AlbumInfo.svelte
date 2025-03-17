<script>
    import SpotifyPlayButton from "../components/SpotifyPlayButton.svelte";
    import { navigate } from "svelte-routing";
    import Song from "../components/Song.svelte";
    import { getReleaseDateYear, grey, lighterMainColor, parseArtists, spotifyGreen } from "../common";
    import { getAlbum } from "../clients/SpotifyClient";
    import { Image } from '@smui/image-list';
    import IconButton from "@smui/icon-button";
    import List from "@smui/list";

    const { albumId } = $props();
    let albumInfo = $state(null);

    const fetchAlbum = async () => {
        const response = await getAlbum(albumId);
        return response;
    };

    $effect(() => {
        fetchAlbum().then(response => albumInfo = response);
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
    {#if albumInfo}
    <div
        class="song-album-display"
    >
        <div
            style="display: flex; flex-direction: row;"
        >
            <Image
                class="cover-display"
                src={albumInfo.images[1].url}
            />
            <div
                style="margin-left: 1vw;"
            >
                <div
                    class="mdc-typography--headline4"
                    style="margin-top: 80px"
                >
                    {albumInfo.name}
                </div>
                <div
                    class="mdc-typography--headline5"
                    style="color: {grey};"
                >
                    {parseArtists(albumInfo.artists)}
                </div>
                <div
                    class="mdc-typography--headline6"
                    style="color: {grey};"
                >
                    {albumInfo.label}
                </div>
                <div
                    class="mdc-typography--headline6"
                    style="color: {grey};"
                >
                    {getReleaseDateYear(albumInfo.release_date)}
                </div>
                {#each albumInfo.genres as genre}
                    <div
                        class="mdc-typography--headline6"
                        style="color: {grey};"
                    >
                        {genre}
                    </div>
                {/each}
                <SpotifyPlayButton 
                    text="Play on Spotify"
                    style="margin-top: 10px; --spotify-green: {spotifyGreen};"
                    href={albumInfo.external_urls.spotify}
                    target="_BLANK"
                />
            </div>
        </div>
        <div
            class="mdc-typography--headline5"
            style="margin: 10px;"
        >
            Album tracks
        </div>
        <List
            twoLine
            avatarList
        >
            {#each albumInfo.tracks.items as song, index}
                <Song
                    songInfo={song}
                    index={index + 1}
                    length={albumInfo.tracks.items.length}
                    albumInfo={albumInfo}
                />
            {/each}
        </List>
    </div>
    {/if}
</main>