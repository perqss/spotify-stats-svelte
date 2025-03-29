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
            <!-- <Button
                variant="raised"
                onclick={handleClickChangeArtist}
            >
                Change artist
            </Button> -->
            <!-- <LayoutGrid> -->
                {#each artists as artist, index (artist.name)}
                    <!-- <Cell
                        spanDevices={{phone: 6, tablet: 4, desktop: 2}}
                    > -->
                        <ArtistCardNoMui
                            className={assignId(artists, index)}
                            index={index + 1}
                            artistInfo={artist}
                        />
                        <!-- <ArtistCard
                            className={assignId(artists, index)}
                            index={index + 1}
                            artistInfo={artist}
                        /> -->
                        <!-- <div>   
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                style="height: 100px"
                        />
                        
                        <button
                            class={assignId(artists, index)}
                        >
                            {artist.name} - {artist.popularity}
                        </button>
                        </div> -->

                    <!-- </Cell> -->
                {/each}
            <!-- </LayoutGrid> -->
        </div>
    </div>
</div>