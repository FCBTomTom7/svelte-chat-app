<div id="chat-main">
    <slot></slot>
</div>

<style>
    :global(.message) {
        width: 100%;
        padding: 5px;
        font-size: 1.25rem;
        word-wrap: break-word;
        color: rgb(174, 168, 168);
    }

    :global(.sender-name) {
        font-weight: bold;
    }

    /* :global(.message, .sender-name) {
        
    } */

    :global(.message-frame:nth-child(even)) {
        background-color: rgb(32, 31, 31);
    }

    :global(.message-frame) {
        width: 100%;
        border-bottom: 1px solid rgb(32, 31, 31);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* #chat-main {
        background-color: #343232;
    } */

    :global(::-webkit-scrollbar) {
        display: block;
        width: 7px;
        border-radius: 20px;
    }
    :global(::-webkit-scrollbar-track) {
        background: transparent;

    }

    :global(::-webkit-scrollbar-thumb) {
        background-color: rgb(33, 31, 31);
        border-radius: 20px;
        border-right: none;
        border-left: none;
    }


    :global(::-webkit-scrollbar-thumb:hover) {
        background-color: rgb(33, 31, 31);
    }

    :global(::-webkit-scrollbar-track-piece:end) {
        background: transparent;
        margin-bottom: 5px;
    }

    :global(::-webkit-scrollbar-track-piece:start) {
        background: transparent;
        margin-top: 5px;
    }
/* 
    :global(.scrollable) {
        margin-right: calc(-1 * (700px - 100%));
    } */
</style>