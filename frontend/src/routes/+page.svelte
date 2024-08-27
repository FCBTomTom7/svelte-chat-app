<script>
    import { user } from '../user.js';
    import Join from '$lib/Join.svelte';
    import Login from '$lib/Login.svelte';
    $: loggedIn = $user !== null;

</script>

<div id="main-page-wrapper">
    {#if loggedIn}
        <h1 class="main-greeting">Welcome back, {$user.name}</h1>
        <Join />
    {:else}
        <h1 class="main-greeting">Welcome, please log in or register to begin chatting</h1>
        <Login />
    {/if}
</div>
<style>
    #main-page-wrapper {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .main-greeting {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>