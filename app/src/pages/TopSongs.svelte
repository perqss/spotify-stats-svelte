<script>
    import { getTopSongs } from "../clients/SpotifyClient";
    import Song from "../components/Song.svelte";

    let { songTerm } = $props();
    let songsInfo = $state(null);

    const fetchTopSongs = async () => {
        const response = await getTopSongs(songTerm);
        return response.items;
    };

    $effect(() => {
        fetchTopSongs().then(response => songsInfo = response);
    });

</script>
<main>
    <div
        class="display-outer-container"
    >
        <div
            class="display-inner-container"
        >
            {#if songsInfo}
                <List
                    twoLine
                    avatarList
                >
                    {#each songsInfo as songInfo, index}
                        <Song
                            songInfo={songInfo}
                            index={index + 1}
                            length={songsInfo.length}
                        />
                    {/each}
                </List>
            {/if}
        </div>
    </div>
</main>