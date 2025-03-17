<script>
    import { onMount } from "svelte";
    import { spotifyGreen, mainColor, darkerMainColor, githubUrl } from "../common";
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton, { Icon } from '@smui/icon-button';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import { getProfile } from "../clients/SpotifyClient";
    import { Spotify, PersonBadge } from "svelte-bootstrap-icons";
    import Button from "@smui/button";
    import { navigate } from "svelte-routing";
    import Menu from '@smui/menu';
    import List, { Item, Separator, Text, Graphic } from '@smui/list';
    import { Image} from '@smui/image-list';

    let profileData = $state(null);
    let menuRef;

    onMount(() => {
        const getProfileWrapper = async () => {
            const response = await getProfile();
            profileData = response;
        };

        getProfileWrapper();
    });

    const handleLogout = () => {
        localStorage.setItem('token', undefined);
        localStorage.setItem('refresh_token', undefined);
        localStorage.setItem('token_expiration_timestamp', undefined);
        navigate('/');
    };
</script>
<main>
    <div>
        <TopAppBar
            variant="static"
            class="app-bar"
            color="primary"
            style="--color: {darkerMainColor}"
        >
        <Row>
            <Section>
                <Spotify 
                    width={48} 
                    height={48}
                    fill={spotifyGreen}
                    />
                <Title>Spotify stats - Svelte</Title>
            </Section>
            <Section
                align="end"
                toolbar
            >
                <Button
                    class="github-button"
                    href={githubUrl}
                    style="--main-color: {mainColor}"
                >
                    Github
                </Button>
                <Wrapper>
                    <IconButton 
                        class="material-icons" 
                        id="xl-button"
                        onclick={() => menuRef.setOpen(true)}
                    >
                        <Image
                            src={profileData?.images[1].url}
                            style="border-radius: 50%; width: 80%; height: 80%;"
                        />
                        <Menu
                            bind:this={menuRef}
                            anchorCorner="BOTTOM_LEFT"
                            style="background-color: {mainColor};"
                        >
                        <List
                            style="color: white;"
                        >
                            <Item 
                                nonInteractive
                            >
                                <Text>
                                    {profileData?.display_name}
                                </Text>
                            </Item>
                            <Item 
                                nonInteractive
                            >
                                <Text>
                                    {profileData?.followers.total} followers
                                </Text>
                            </Item>
                            <Separator
                                style="background-color: white;"
                            />
                            <a
                                href={profileData?.external_urls.spotify}
                                target="_BLANK"
                                style="color: inherit;"
                            >
                                <Item>
                                    <Text>
                                        Go to your Spotify page
                                    </Text>
                                </Item>
                            </a>
                        </List>
                    </Menu>
                    </IconButton>
                    <Tooltip
                        xPos="start"
                    >
                        Account
                    </Tooltip>
                </Wrapper>
                <Wrapper>
                    <IconButton 
                        class="material-icons" 
                        id="xl-button"
                        onclick={handleLogout}
                    >
                        logout
                    </IconButton>
                    <Tooltip
                        xPos="start"
                    >
                        Log out
                    </Tooltip>
                </Wrapper>
            </Section>
        </Row>
        </TopAppBar>
    </div>
</main>
<style>
    * :global(.app-bar) {
        background-color: var(--color);
        display: flex;
        flex-direction: row;
        width: 100vw;
        top: 0;
        padding: 0;
        margin: 0;
        left: 0;
        position: fixed;
    }

    :global(#xl-button) {
        font-size: 35px;
        padding: 0px;
    }

    :global(.mdc-button .mdc-button__ripple)::before, :global(.mdc-button .mdc-button__ripple)::after {
        background-color: var(--main-color);
    }

</style>
