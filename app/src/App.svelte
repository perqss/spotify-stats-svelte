<script>
    import Login from "./pages/Login.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import TopArtists from "./pages/TopArtists.svelte";
    import Menu from "./components/Menu.svelte";
    import ArtistProfile from "./pages/ArtistProfile.svelte";
    import TopSongs from "./pages/TopSongs.svelte";
    import SongInfo from "./pages/SongInfo.svelte";
    import RecentlyPlayed from "./pages/RecentlyPlayed.svelte";
    import TopAlbums from "./pages/TopAlbums.svelte";
    import AlbumInfo from "./pages/AlbumInfo.svelte";
    import BottomBar from "./components/BottomBar.svelte";
    import { setContext } from "svelte";

    let artistTerm = $state("long_term");
    let songTerm = $state("long_term");
    let albumTerm = $state("long_term");
    let artistId = $state(null);
    let albumId = $state(null);
    let songId = $state(null);
    let openBottomBar = $state(false);

    setContext("spotifyPlayerContext", {
        set openBottomBar(value) {openBottomBar = value},
        set artistId(value) {artistId = value},
        set albumId(value) {albumId = value},
        set songId(value) {songId = value}
    });

</script>

<main>
    <Router>
        <Route 
            path='/'
        > 
            <Login /> 
        </Route>
        <Route 
            path='/top-artists'
        >
            <div>
                <Menu
                    componentIndex={0}
                    bind:term={artistTerm}
                />
                <TopArtists 
                    artistTerm={artistTerm}
                />
            </div>
        </Route>
        <Route
            path='/artist/:artistId'
            let:params
        >
            <div>
                <Menu
                    bind:term={artistTerm}
                />
                <ArtistProfile
                    artistId={params.artistId}
                />
            </div>
        </Route>
        <Route
            path='/top-songs'
        >
            <div>
                <Menu 
                    componentIndex={1}
                    bind:term={songTerm}
                />
                <TopSongs 
                    songTerm={songTerm}
                />
            </div>
        </Route>
        <Route
            path='/song/:songId'
            let:params
        >
            <div>
                <Menu
                    bind:term={songTerm}
                />
                <SongInfo
                    songId={params.songId}
                />
            </div>
        </Route>
        <Route
            path='/recently-played'
        >
            <div>
                <Menu
                    componentIndex={3}
                />
                <RecentlyPlayed/>
            </div>
        </Route>
        <Route
            path='/top-albums'
        >
            <div>
                <Menu
                    componentIndex={2}
                    bind:term={albumTerm}
                />
                <TopAlbums
                    albumTerm={albumTerm}
                />
            </div>
        </Route>
        <Route
            path='/album/:albumId'
            let:params
        >
            <div>
                <Menu
                    bind:term={albumTerm}
                />
                <AlbumInfo
                    albumId={params.albumId}
                />
            </div>
        </Route>
    </Router>
    <BottomBar
        artistId={artistId}
        albumId={albumId}
        songId={songId}
        bind:open={openBottomBar}
    />
</main>