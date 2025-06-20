<script>
    import { getTopArtists, isFollowingArtists, followArtists, unfollowArtists } from "../clients/SpotifyClient";
    import ArtistCardNoMui from "../components/ArtistCardNoMUI.svelte";
    import { assignArtistId } from "../common";
    import { onMount } from "svelte";
    import { getContext } from 'svelte';
    import { spotifyGreen } from "../common";
    import { navigate } from "svelte-routing";

    let artists = $state([]); 
    let { artistTerm } = $props();

    const fetchTopArtists = async () => {
        const response = await getTopArtists(artistTerm);
        return response.items;
    };

    // $effect(() => {
    //     const fetchArtistsWrapper = async () => {
    //         const topArtists = await fetchTopArtists();
    //         const artistIds = topArtists.map((artist) => artist.id);
    //         const followed = await isFollowingArtists(artistIds);
    //         artists = topArtists.map((artist, index) => {
    //             return {
    //                 ...artist,
    //                 isFollowing: followed[index],
    //             };
    //         });
    //     };

    //     fetchArtistsWrapper();
    // });
    let spotifyPlayerContext = getContext("spotifyPlayerContext");
    const handleClickArtist = (id) => {
        navigate(`/artist/${id}`);
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        // spotifyPlayerContext.artistId = artistInfo.id; 
        // spotifyPlayerContext.openBottomBar = true;
        // spotifyPlayerContext.albumId = null;
        // spotifyPlayerContext.songId = null;
    };

    // const handleClickFollowBtn = async (event) => {
    //   event.stopPropagation();
    //   await handleClickFollowBtnParent(artistInfo);
    // };

    onMount(async () => {
        const topArtists = await fetchTopArtists();
        const artistIds = topArtists.map((artist) => artist.id);
        const followed = await isFollowingArtists(artistIds);
        artists = topArtists.map((artist, index) => {
            return {
                ...artist,
                isFollowing: followed[index],
            };
        });
    })

    const handleClickFollowBtnParent = async (artist) => {
    //   if (!artists[index].isFollowing) {p
    //     await followArtists([artists[index].id]);
    //   } else {
    //     await unfollowArtists([artists[index].id]);
    //   }
    //   artists[index].isFollowing = !artists[index].isFollowing;
    if (!artist.isFollowing) {
        await followArtists([artist.id]);
      } else {
        await unfollowArtists([artist.id]);
      }
      artist.isFollowing = !artist.isFollowing;
    };

</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div>
    <div
        class="display-outer-container"
    >
        <div
            class="display-inner-container"
        >
            <div class="grid-container">
                {#each artists as artist, index (artist.id)}
                    <div class="grid-item">
                        <div class="card-wrapper">
                            <div class="card-index">{index + 1}</div>
                            <div class={assignArtistId(artists, index)}>
                                <div class="artist-album-card" onclick={() => handleClickArtist(artist.id)}>
                                    <img class="artist-album-image" src={artist.images[0].url} alt={artist.name} />
                                    <div class="artist-album-info">
                                        <p class="artist-album-name">{`${artist.name}`}</p>
                                    </div>
                                    <div>
                                    <button 
                                        class="material-icons" 
                                        style="background-color: inherit;" 
                                        onclick={handleClickPlayBtn} 
                                        title="Play"
                                    >
                                        play_circle
                                    </button>
                                    <button 
                                        class="material-icons follow-button" 
                                        style="background-color: inherit; color: {artist.isFollowing ? spotifyGreen : 'white'}" 
                                        onclick={() => handleClickFollowBtnParent(artist)}
                                        title="{artist.isFollowing ? 'Unfollow' : 'Follow'}"
                                    >
                                        favorite
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>