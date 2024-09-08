<script>
    export let clickFunction;
    export let messageCount = null;
    const maxCount = 15;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions a11y-no-static-element-interactions-->
<div id="new-messages-bar" on:click={clickFunction}>
    <p id="new-message-text">{messageCount && messageCount <= maxCount ?
     messageCount.toString() + (messageCount !== 1 ? ' new messages' : ' new message') 
    : messageCount ? maxCount.toString() + '+ new messages' : 'Jump to present'}</p>
</div>

<style>
    #new-messages-bar {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(47, 43, 43, 0.563);
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
    }

    #new-messages-bar:hover {
        background-color: rgba(63, 60, 60, 0.563);
    }
</style>