<script>
    import Button from '@smui/button'; 

    let { text, ...restProps } = $props();
</script>

<main>
    <Button 
        class="spotify-button"
        variant="raised"
        {...restProps}
    >
        {text}
    </Button>
</main>


<style>
    * :global(.spotify-button) {
        color: black;
        background-color: var(--spotify-green); 
    }

    * :global(.spotify-button):hover {
        background-color: #26eb6b;
    }
</style>
