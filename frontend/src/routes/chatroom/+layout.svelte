<div id="chat-main">
    <slot></slot>
</div>

<style>

    :global(.message) {
        width: 100%;
        padding: 5px;
        font-size: 1.25rem;
        overflow-wrap: break-word;
        /* color: rgb(174, 168, 168); */
    }

    :global(.sender-name) {
        font-weight: bold;
    }


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

    :global(.scrollable) {
        scrollbar-width: none;
        /* scrollbar-color: rgb(104, 103, 103) transparent; */
        /* scrollbar-gutter: stable both-edges; */
        /* overflow-y: overlay; */
    }

    :global(::-webkit-scrollbar) {
        display: none !important;
    }
</style>