<script>
    import { user } from '../user.js';
    import Join from '$lib/Join.svelte';
    import Login from '$lib/Login.svelte';
    $: loggedIn = $user !== null;

</script>

{#if loggedIn}
    <h1 class="main-greeting">Welcome back, {$user.name}</h1>
    <Join />
{:else}
    <h1 class="main-greeting">Welcome, please log in or register to begin chatting</h1>
    <Login />
{/if}

<style>
    .main-greeting {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>