<script>
    import BottomBar from "./components/BottomBar.svelte";
    import CustomRoutes from "./components/CustomRoutes.svelte";
    import PlaybackProvider from "./components/PlaybackProvider.svelte";
</script>

<PlaybackProvider>
    <CustomRoutes/>
    <BottomBar/>
</PlaybackProvider>
