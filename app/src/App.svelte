<script>
    import Login from "./pages/Login.svelte";
    import { Router, Route } from "svelte-spa-router";
    import TopArtists from "./pages/TopArtists.svelte";

    const routes = {
        '/': Login,
        '/top-artists': TopArtists,
    }
</script>

<main>
    <Router {routes}/>
</main>