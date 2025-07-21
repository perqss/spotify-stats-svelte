<script>
    import { getTopSongs } from "../clients/SpotifyClient";
    import AlbumCard from "../components/AlbumCard.svelte";

    let { albumTerm } = $props();
    let albums = $state(null);
    let songsInfo = $state(null);

    const fetchTopSongs = async () => {
        const response = await getTopSongs(albumTerm);
        return response.items;
    };

    $effect(() => {
        fetchTopSongs().then((response) => (songsInfo = response));
    });

    $effect(() => {
        if (songsInfo) {
            let result = {}
            songsInfo.forEach((song, index) => {
                if (song.album.album_type === 'album') {
                    if (!(song.album.name in result)) {
                        result[song.album.name] = {
                            indexSum: index,
                            count: 1,
                            image: song.album.images[0].url,
                            id: song.album.id,
                        }
                    } else {
                        result[song.album.name].count += 1;
                        result[song.album.name].indexSum += index;
                    }
                }     
            })
            const entries = Object.entries(result);
            entries.sort((a, b) => {
                if (b[1].count !== a[1].count) {
                return b[1].count - a[1].count;
                }
                return a[1].indexSum - b[1].indexSum;
            });
            albums = entries;
        }
    });
</script>

<div class="display-outer-container">
    <div class="display-inner-container">
        <div class="grid-container">
            {#each albums as album, index (album[1].id)}
                <div class="grid-item">
                    <div class="card-wrapper">
                        <div class="card-index">{index + 1}</div>
                        <AlbumCard album={album}/>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
