<script>
    import { roomID } from '../room.js';
    import { goto } from '$app/navigation';
    let code;
    let error = '';
    let timeout;
    async function handleSubmit() {
        if(!code && code !== 0) code = 1;
        if(timeout) clearTimeout(timeout);
        if(!/^[0-9]{0,3}$/.test(code.toString())) {
            // code isn't a number or isn't between 0-4 characters
            // or is negative
            console.log('invalid');
            error = 'Invalid code';
            timeout = setTimeout(() => {
                error = '';
                console.log('error rid');
            }, 5000)
        } else {
            error = '';
            $roomID = code;
            await goto('/chatroom', {invalidateAll: true});
        }
        
    }
</script>

<div id="join-wrapper">
    
    <form id="code-form" on:submit|preventDefault={handleSubmit}>
        <h2 id="join-title">Join any room from<br>0-999</h2>
        <p id="error" class={error ? '' : 'hidden'}>{error}</p>
        <input type="number" id="code-input" bind:value={code} placeholder="Enter a room code, e.g 133" />
        <button type="submit" id="code-submit">Join</button>
    </form>
</div>


<style>
    #join-title {
        text-align: center;
        position: absolute;
        top: -4.75rem;
        width: 100%;
    }

    #join-wrapper { 
        width: 50%;
        height: 60%;
        /* display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center; */
        position: relative;
    }   

    #code-form {
        width: 50%;
        height: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 25%;
        top: calc(50% - 1.5rem);
    }

    #code-input {
        width: 85%;
        height: 100%;
        font-size: 1.5rem;
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
        color: rgb(211, 22, 22);
        width: 100%;
        position: absolute;
        /* left: -1.5%; */
        /* text-align: center; */
        top: -1.3rem;
        margin-left: 1px;
    }
</style>