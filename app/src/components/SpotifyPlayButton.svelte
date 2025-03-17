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
        <div
            class="mdc-typography--headline6"
        >
            {text}
        </div>
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
