<script>
    import List, { Item, Graphic, Text } from '@smui/list';
    import { mainColor, darkerMainColor, lighterMainColor } from '../common';
    import { onMount } from 'svelte';
    import TopBar from './TopBar.svelte';
    import { fade } from 'svelte/transition';
    import { navigate } from 'svelte-routing';

    let { componentIndex, term = $bindable() } = $props();
    let selectedMenu = $state(componentIndex);
    let selectedSubMenu = $state('All Time');
    const menuItems = ['Top Artists', 'Top Songs', 'Top Albums', 'Recently Played', 'Music Taste'];
    const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
    const menuIcons = ['mic', 'music_note', 'album', 'history', 'query_stats'];

    const handleClickMenuItem = (index) => {
        selectedMenu = index;
    };

    const openSubMenu = (index) => {
        return [0, 1, 2].includes(index) && selectedMenu === index;
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

    const handleClickSubMenuItem = (subMenuItem) => {
        switch(subMenuItem) {
            case subMenuItems[0]:
                term = 'long_term';
                selectedSubMenu = subMenuItems[0];
                break;
            case subMenuItems[1]:
                term = 'medium_term';
                selectedSubMenu = subMenuItems[1];
                break;
            case subMenuItems[2]:
                term = 'short_term';
                selectedSubMenu = subMenuItems[2];
                break;
        }
    };

</script>
<div>
    <TopBar/>
    <aside class="sidebar">
        {#each menuItems as item, index}
          <div
            class="menu-item {selectedMenu === index ? 'selected-menu' : ''}"
            onclick={() => handleClickMenuItem(index)}
          >
            <span class="material-icons icon">{menuIcons[index]}</span>
            <span class="label">{item}</span>
          </div>
    
          {#if openSubMenu(index)}
            <div class="submenu">
              {#each subMenuItems as subItem}
                <div
                  class="submenu-item {selectedSubMenu === subItem ? 'selected-submenu' : ''}"
                  onclick={() => handleClickSubMenuItem(subItem, index)}
                >
                  {subItem}
                </div>
              {/each}
            </div>
          {/if}
        {/each}
      </aside>
</div>
<style>
.sidebar {
    width: 200px;
    height: 100vh;
    background-color: #121212;
    padding-top: 70px;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .menu-item,
  .submenu-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: white;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;
  }

  .menu-item:hover,
  .submenu-item:hover {
    background-color: #1e1e1e;
  }

  .selected-menu {
    background-color: #2e2e2e; 
  }

  .selected-submenu {
    background-color: #1e1e1e;
  }

  .icon {
    margin-right: 12px;
    font-size: 20px;
  }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .submenu {
    display: flex;
    flex-direction: column;
    background-color: #121212;
  }

  .submenu-item {
    padding-left: 48px;
    font-size: 0.9rem;
  }
</style>