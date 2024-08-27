<script>
    import { roomID } from '../room.js';
    import { goto } from '$app/navigation';
    let code;
    async function handleSubmit() {
        $roomID = code;
        await goto('/chatroom');
    }
</script>

<form id="code-form" on:submit|preventDefault={handleSubmit}>
    <input type="number" id="code-input" bind:value={code} placeholder="Enter a room code, e.g 1337" />
    <button type="submit" id="code-submit">Join</button>
</form>

<style>
    #code-form {
        width: 20%;
        height: 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #code-input {
        width: 85%;
        height: 100%;
        outline: none;
    }

    #code-submit {
        height: 80%;
        width: 14%;
    }
</style>