<script>
    import { user } from "../user";
    import { goto } from '$app/navigation'
    const logout = async() => {
        try {
            let resp = await fetch('/logout');
            goto('/');
            $user = null;
        }
        catch(error) {
            console.log(error);
        }
    }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions-->
<p on:click={logout}>Logout</p>

<style>
    p {
        cursor: pointer;
        font-size: 1.25rem;
    }
</style>