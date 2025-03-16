<script>
    import { getTopArtists } from "../clients/SpotifyClient";
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import ArtistCard from "../components/ArtistCard.svelte";

    let artists = $state(null);
    let { artistTerm } = $props();

    const fetchTopArtists = async (term) => {
        const response = await getTopArtists(term);
        return response.items;
    };

    $effect(() => {
        console.log(artistTerm)
        fetchTopArtists(artistTerm).then(response => artists = response);
    });
    
</script>
<main>
    <div
        class="display-outer-container"
    >
        <div
            class="display-inner-container"
        >
            <LayoutGrid>
                {#each artists as artist, index}
                    <Cell

                        spanDevices={{phone: 6, tablet: 4, desktop: 2}}
                    >
                        <ArtistCard
                            index={index + 1}
                            artistInfo={artist}
                        />
                    </Cell>
                {/each}
            </LayoutGrid>
        </div>
    </div>
</main>