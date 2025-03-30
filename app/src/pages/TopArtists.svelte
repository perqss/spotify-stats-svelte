<script>
    import { getTopArtists } from "../clients/SpotifyClient";
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import ArtistCard from "../components/ArtistCard.svelte";
    import ArtistCardNoMui from "../components/ArtistCardNoMUI.svelte";
    import Button from "@smui/button";

    let artists = $state(null);
    let { artistTerm } = $props();

    const fetchTopArtists = async (term) => {
        const response = await getTopArtists(term);
        return response.items;
    };

    $effect(() => {
        fetchTopArtists(artistTerm).then(response => artists = response);
    });

    const handleClickChangeArtist = () => {
        artists[10].name = "Changed";
    };

    const assignId = (artists, index) => {
        if (artists.length - 1 === index) {
            return "last-artist";
        }
    };
    
</script>
<div>
    <div
        class="display-outer-container"
    >
        <div
            class="display-inner-container"
        >
            <div class="grid-container">
                {#each artists as artist, index (artist.name)}
                    <div class="grid-item">
                        <ArtistCardNoMui
                            className={assignId(artists, index)}
                            index={index + 1}
                            artistInfo={artist}
                        />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>