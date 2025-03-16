<script>
    import Login from "./pages/Login.svelte";
    //import { Router } from "@mateothegreat/svelte5-router";
    import { Router, Link, Route } from "svelte-routing";
    import TopArtists from "./pages/TopArtists.svelte";
    import Menu from "./components/Menu.svelte";
    import ArtistProfile from "./pages/ArtistProfile.svelte";

    let artistTerm = $state("long_term");
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
    </Router>
</main>