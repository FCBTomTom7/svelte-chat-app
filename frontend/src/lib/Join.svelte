<script>
    import { roomID } from '../room.js';
    import { goto } from '$app/navigation';
    let code;
    let error = '';
    async function handleSubmit() {
        if(!code) code = 1;
        if(!/^[0-9]{0,4}$/.test(code.toString())) {
            // code isn't a number or isn't between 0-4 characters
            // or is negative
            console.log('invalid');
            error = 'Invalid code';
        } else {
            error = '';
            $roomID = code;
            await goto('/chatroom');
        }
        
    }
</script>

<p id="error" class={error ? '' : 'hidden'}>{error}</p>
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
        background-color: rgb(32, 31, 31);
        border: 1px solid rgb(174, 168, 168);
        padding: 2px;
        border-radius: 3px;
        color: rgb(174, 168, 168);
    }



    #code-submit {
        height: 80%;
        width: 14%;
        font-size: .8rem;
    }

    .hidden {
        visibility: hidden;
    }

    #error {
        color: red;
        width: 17%;
        position: relative;
        left: -1.5%;
        text-align: center;
    }
</style>