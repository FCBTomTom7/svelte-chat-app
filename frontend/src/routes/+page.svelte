<script>
    import { user } from '../user.js';
    import Join from '$lib/Join.svelte';
    import Login from '$lib/Login.svelte';
    // import {invalidateAll} from '$app/navigation';
    // invalidateAll()
    export let data;
    // console.log('before logic');
    // console.log('/, data',data);
    // console.log('/, user', $user)
    // $user = data.name ? {name: data.name} : null;
    // if($user === null && data.name !== null) {
    //     $user = {name: data.name};
    // } else if(data.name === null) {
    //     $user = null;
    // }
    if($user === null && data.name !== null) {
        $user = {name: data.name};
    } else if(data.name === null) {
        $user = null;
    }
    // console.log('after logic');
    // console.log('/, data',data);
    // console.log('/, user', $user);
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

<!-- {#if loggedIn}
    <div id="main-page-wrapper" style="justify-content: center">
        <h1 class="main-greeting">Welcome back, {$user.name}</h1>
        <Join />
    </div>
    {:else}
    <div id="main-page-wrapper">
        <h1 class="main-greeting">Welcome, please log in or register to begin chatting</h1>
        <Login />
    </div>
{/if} -->
<style>
    /* .join-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    } */

    #main-page-wrapper {
        width: 100%;
        height: 96%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: top; */
        position: absolute;
        top: 4%;
    }

    .main-greeting {
        width: 50%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        text-align: center;
        font-weight: 600;
    }
</style>