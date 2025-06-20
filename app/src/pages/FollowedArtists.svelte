<script>
    import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
    import ArtistCardNoMui from "../components/ArtistCardNoMUI.svelte";
    import { assignArtistId } from "../common";

    //let artists = $state([]);
    let artists = $state.raw([]);

    const fetchFollowedArtists = async () => {
        const response = await getFollowedArtists();
        return response.artists.items;
    };

    $effect(() => {
        const fetchArtistsWrapper = async () => {
            const followedArtists = await fetchFollowedArtists();
            const artistIds = followedArtists.map((artist) => artist.id);
            const followed = await isFollowingArtists(artistIds);
            artists = followedArtists.map((artist, index) => {
                return {
                    ...artist,
                    isFollowing: followed[index],
                };
            });
        };

        fetchArtistsWrapper();
    });

    const handleClickFollowBtnParent = async (artist) => {
        await unfollowArtists([artist.id]);
        // const index = artists.findIndex((a) => a.id === artist.id);
        // if (index !== -1) {
        //     artists.splice(index, 1);
        //     artists = artists;
        // }
        artists = artists.filter((a) => a.id !== artist.id);
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
                        <div class="card-wrapper">
                            <div class="card-index">{index + 1}</div>
                            <ArtistCardNoMui
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
</div>