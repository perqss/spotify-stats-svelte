<script>
    import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from "../clients/SpotifyClient";
    import ArtistCard from "../components/ArtistCard.svelte";
    import { assignArtistId } from "../common";

    let artists = $state([]);
    let { artistTerm } = $props();

    const fetchTopArtists = async () => {
        const response = await getTopArtists(artistTerm);
        return response.items;
    };

    $effect(() => {
        const fetchArtistsWrapper = async () => {
            const topArtists = await fetchTopArtists();
            const artistIds = topArtists.map((artist) => artist.id);
            const followed = await isFollowingArtists(artistIds);
            artists = topArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            });
        };

        fetchArtistsWrapper();
    });

    const handleClickFollowBtnParent = async (artist) => {
        if (!artist.isFollowing) {
            await followArtists([artist.id]);
        } else {
            await unfollowArtists([artist.id]);
        }
        artist.isFollowing = !artist.isFollowing;
    };

</script>
<div class="display-outer-container">
    <div class="display-inner-container">
        <div class="grid-container">
            {#each artists as artist, index (artist.id)}
                <div class="grid-item">
                    <div class="card-wrapper">
                        <div class="card-index">{index + 1}</div>
                        <ArtistCard
                            className={assignArtistId(artists, index)}
                            artistInfo={artist}
                            handleClickFollowBtnParent={handleClickFollowBtnParent}
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>