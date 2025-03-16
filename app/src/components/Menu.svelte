<script>
    import List, { Item, Graphic, Text } from '@smui/list';
    import { mainColor, darkerMainColor, lighterMainColor } from '../common';
    import { onMount } from 'svelte';
    import TopBar from './TopBar.svelte';
    import { fade } from 'svelte/transition';
    import { navigate } from 'svelte-routing';

    let { componentIndex, term = $bindable() } = $props();
    console.log(componentIndex, term)

    let selectedMenu = $state(componentIndex);
    let selectedSubMenu = $state('All Time');
    const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Music Taste'];
    const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
    const menuIcons = ['mic', 'music_note', 'album', 'history', 'query_stats'];

    const handleClickMenuItem = (index) => {
        selectedMenu = index;
    };

    const openSubMenu = (index) => {
        return selectedMenu === index;
    };

    $effect(() => {
        switch(selectedMenu) {
            case 0:
                navigate('/top-artists');
                break;
            case 1:
                navigate('/top-songs');
                break;
            case 2:
                navigate('/top-albums');
                break;
            case 3:
                navigate('/recently-played');
                break;
            case 4:
                navigate('/music-taste');
                break;
        }
    });

    $effect(() => {
        console.log(typeof term)
        switch(term) {
            case 'long_term':
                selectedSubMenu = subMenuItems[0];
                break;
            case 'medium_term':
                console.log(term)
                selectedSubMenu = subMenuItems[1];
                break;
            case 'short_term':
                selectedSubMenu = subMenuItems[2];
                break;
        }
    });

    const setPropsTerm = (subMenuItem) => {
        switch(subMenuItem) {
            case subMenuItems[0]:
                term = 'long_term';
                break;
            case subMenuItems[1]:
                term = 'medium_term';
                break;
            default:
                term = 'short_term';
        }
    };

    const handleClickSubMenuItem = (subMenuItem, index) => {
        switch (index) {
            case 0:
                setPropsTerm(subMenuItem);
                break;
            case 1:
                setPropsTerm(subMenuItem);
                break;
            case 2:
                setPropsTerm(subMenuItem);
                break;
        }
        selectedSubMenu = subMenuItem;
    };
</script>
<main>
    <TopBar/>
    <div
        class="box"
        style="--main-color: {mainColor}"
    >
        <List>
            {#each menuItems as item, index}
                <Item 
                    onSMUIAction={() => handleClickMenuItem(index)}
                >
                    <Graphic
                        class="material-icons"
                        style="color: white;"
                    >
                        {menuIcons[index]}
                    </Graphic>
                    <Text
                        style="white-space: nowrap; overflow: visible; color: white;"
                    >
                        {item}
                    </Text>
                </Item>
                {#if openSubMenu(index)}
                    <div
                        in:fade={{delay: 100}}
                    >
                        {#if selectedMenu === index}
                            {#each subMenuItems as subMenuItem}
                                <Item
                                    onSMUIAction={() => handleClickSubMenuItem(subMenuItem, index)}
                                    selected={selectedSubMenu === subMenuItem}
                                    style="color: white;"
                                >
                                    {subMenuItem}
                                </Item>
                            {/each}
                        {/if}
                    </div>
                {/if}
            {/each}
        </List>
    </div>
</main>
<style>
  .box {
    max-width: 200px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: var(--main-color);
    top: 60px;
    padding: 0;
    left: 0;
  }
</style>