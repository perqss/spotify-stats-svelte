<script>
    import Card, {
        Content,
        PrimaryAction,
        Media,
        MediaContent,
    } from '@smui/card';

    let { index, artistInfo } = $props();
    console.log(artistInfo.images[0].url)
</script>
<main>
    <Card>
        <PrimaryAction>
            <Media
                class="card-media-img"
                style="--url: url({artistInfo.images[0].url})"
                aspectRatio="square"
            />
        </PrimaryAction>
    </Card>
</main>
<style>
    * :global(.card-media-img) {
        background-image: var(--url);
    }
</style>