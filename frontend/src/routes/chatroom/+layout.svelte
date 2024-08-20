<div id="chat-main">
    <slot></slot>
</div>

<style>
    :global(.message) {
        width: 100%;
        padding: 5px;
        font-size: 1.25rem;
        word-wrap: break-word;
    }

    :global(.message-frame:nth-child(even)) {
        background-color: rgb(235, 235, 235);
    }

    :global(.message-frame) {
        width: 100%;
        border-bottom: 1px solid grey;
        display: flex;
        align-items: center;
    }
</style>