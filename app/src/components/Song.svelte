<script>
    import { navigate } from 'svelte-routing';
    import { grey, parseArtists, durationInHrMinSec } from '../common';
    import { getContext } from 'svelte';

    let spotifyPlayerContext = getContext("spotifyPlayerContext");
    let { className, songInfo, length, albumInfo } = $props();

    const handleSecondary = () => {
        if (albumInfo) {
            return `${parseArtists(songInfo.artists)}`;
        } else {
            return `${parseArtists(songInfo.album.artists)} - ${songInfo.album.name}`;
        }
    };

    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        spotifyPlayerContext.songId = songInfo.id;
        spotifyPlayerContext.openBottomBar = true;
        spotifyPlayerContext.artistId = null;
        spotifyPlayerContext.albumId = null;
    };

    const handleSongClick = () => {
        navigate(`/song/${songInfo.id}`);
    };

</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={className}>
    <div class="song-item" onclick={handleSongClick}>
        <div class="song-left">
            <img
                class="song-graphic"
                src={albumInfo ? albumInfo.images[1].url : songInfo.album.images[2].url}
                alt="Cover art"
            />
            <div class="song-text">
                <div class="primary-text">{songInfo.name}</div>
                <div class="secondary-text" style="color: {grey};">{handleSecondary()}</div>
            </div>
        </div>

        <div class="meta-controls">
            <button class="material-icons play-button" onclick={handleClickPlayBtn}>
                play_circle
            </button>
            <div class="duration">{durationInHrMinSec(songInfo.duration_ms)}</div>
        </div>
    </div>
</div>

<style>
.play-button {
    background-color: inherit;
}
.song-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid white;
}

.song-item:hover {
    background-color: #2a2a2a;
}

.song-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.song-graphic {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 30px;
}

.song-text {
    display: flex;
    flex-direction: column;
}

.primary-text {
    color: white;
    font-size: 1rem;
}

.secondary-text {
    font-size: 0.85rem;
}

.meta-controls {
    display: flex;
    align-items: center;
    gap: 16px;
}

.duration {
    color: white;
    font-size: 0.9rem;
    text-align: right;
}

.separator {
    height: 1px;
    background-color: white;
}
</style>