<script>
    import Login from "./pages/Login.svelte";
    import { Router, Link, Route } from "svelte-routing";
    import TopArtists from "./pages/TopArtists.svelte";
    import Menu from "./components/Menu.svelte";
    import ArtistProfile from "./pages/ArtistProfile.svelte";
    import TopSongs from "./pages/TopSongs.svelte";
    import SongInfo from "./pages/SongInfo.svelte";
    import RecentlyPlayed from "./pages/RecentlyPlayed.svelte";
    import "./global.scss"

    let artistTerm = $state("long_term");
    let songTerm = $state("long_term");
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
                    artistId="{params.artistId}"
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
                    songId="{params.songId}"
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
    </Router>
</main>