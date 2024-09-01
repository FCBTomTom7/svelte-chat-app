<script>
    export let clickFunction;
    export let messageCount = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions a11y-no-static-element-interactions-->
<div id="new-messages-bar" on:click={clickFunction}>
    <p id="new-message-text">{messageCount ? messageCount.toString() + (messageCount !== 1 ? ' new messages' : ' new message') : 'Jump to present'}</p>
</div>

<style>
    #new-messages-bar {
        width: 20%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(47, 43, 43, 0.563);
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
    }
</style>