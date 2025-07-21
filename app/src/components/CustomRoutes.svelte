<script>
    import { Router, Route } from "svelte-routing";
    import Login from "../pages/Login.svelte";
    import TopArtists from "../pages/TopArtists.svelte";
    import TopSongs from "../pages/TopSongs.svelte";
    import RecentlyPlayed from "../pages/RecentlyPlayed.svelte";
    import Menu from "./Menu.svelte";
    import ArtistProfile from "../pages/ArtistProfile.svelte";
    import SongInfo from "../pages/SongInfo.svelte";
    import TopAlbums from "../pages/TopAlbums.svelte";
    import AlbumInfo from "../pages/AlbumInfo.svelte";
    import FollowedArtists from "../pages/FollowedArtists.svelte";
    import SavedSongs from "../pages/SavedSongs.svelte";

    let artistTerm = $state("long_term");
    let songTerm = $state("long_term");
    let albumTerm = $state("long_term");

</script>

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
                closeSubMenu
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
                closeSubMenu
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
                closeSubMenu
            />
            <AlbumInfo
                albumId={params.albumId}
            />
        </div>
    </Route>
    <Route
        path='/followed-artists'
    >
        <div>
            <Menu
                componentIndex={5}
            />
            <FollowedArtists/>
        </div>
    </Route>
    <Route
        path='/saved-songs'
    >
        <div>
            <Menu
                componentIndex={6}
            />
            <SavedSongs/>
        </div>
    </Route>
</Router>