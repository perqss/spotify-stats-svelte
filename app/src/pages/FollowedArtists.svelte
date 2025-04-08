<script>
    import { getFollowedArtists, isFollowingArtists, unfollowArtists } from "../clients/SpotifyClient";
    import ArtistCardNoMui from "../components/ArtistCardNoMUI.svelte";

    let artists = $state(null);

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

    const assignId = (artists, index) => {
        if (artists.length - 1 === index) {
            return "last-artist";
        } else if (index === 0) {
            return "first-artist";
        }
    };

    const handleClickFollowBtnParent = async (index) => {
        await unfollowArtists([artists[index].id]);
        artists.splice(index, 1);
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
                                className={assignId(artists, index)}
                                artistInfo={artist}
                                handleClickFollowBtnParent={() => handleClickFollowBtnParent(index)}
                            />
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>