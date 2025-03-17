<script>
    import { getRecentlyPlayed } from "../clients/SpotifyClient";
    import List from '@smui/list';
    import Song from "../components/Song.svelte";

    const fetchRecentlyPlayed = async () => {
        const response = await getRecentlyPlayed();
        return response.items;
    };

    let songsInfo = $state(null);

    $effect(() => {
        fetchRecentlyPlayed().then(response => songsInfo = response);
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
                            key={index}
                            songInfo={songInfo.track}
                            index={index + 1}
                            length={songsInfo.length}
                        />
                    {/each}
                </List>
            {/if}
        </div>
    </div>
</main>