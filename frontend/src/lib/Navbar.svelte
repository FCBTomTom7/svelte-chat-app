<script>
    import Logout from "./Logout.svelte";
</script>

<div id="navbar-frame">
    <div id="route-links">
        <a id="home-link" href="/" data-sveltekit-reload>Home</a>
        <a id="chatroom-link" href="/chatroom" data-sveltekit-reload>Chatroom</a>
        <div id="logout-link">
            <Logout />
        </div>
    </div>
    
</div>

<style>
    #navbar-frame {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(33, 31, 31);
        width: 100%;
        height: 4%;
        box-shadow: 0 -1px 3px 3px rgb(33, 31, 31);
        z-index: 2;
        /* color: #d4d4d4; */
        color: rgb(163, 168, 168);
    }

    #route-links {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: rgb(163, 168, 168);
        font-size: 1.25rem;
    }
</style>