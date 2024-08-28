<script>
    import Navbar from "../lib/Navbar.svelte";
</script>
<div id="main">
    <Navbar />
    <slot></slot>
</div>

<style>
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    :global(body) {
        width: 100vw;
        height: 100vh;
    }
    #main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #292828;
        color: rgb(174, 168, 168);
    }
</style>