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
        font-family: "Karla", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
    }

    :global(input, button) {
        font-family: inherit;
    }

    #main {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #292828;
        /* color: rgb(174, 168, 168); */
        color: #d4d4d4;
    }

    :global(input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button){
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    :global(input[type=number]) {
        -moz-appearance: textfield;
        appearance: textfield;
    }
</style>