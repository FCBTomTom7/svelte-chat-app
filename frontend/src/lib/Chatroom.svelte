<script>
    import { io } from "socket.io-client";
    import { onMount } from 'svelte';
    import { roomID } from "../room";
    const SOCKET_URL = "http://localhost:3000";
    const socket = io(SOCKET_URL);
    socket.emit('roomID', $roomID);
    let message = '';
    let messageContainer;
    const maxMessages = 100;
    onMount(() => {
        socket.on('message', m => {
            appendMessage(m);
        })

        return () => {
            socket.removeAllListeners();
        }
    })

    const sendMessage = async () => {
        if(!/^\s*$/.test(message)) socket.emit('message', message);
        message = '';
    }

    const keyHandler = (e) => {
        if(e.key === 'Enter') sendMessage();
    }

    const appendMessage = (text) => {
        while(messageContainer.childNodes.length >= maxMessages) {
            messageContainer.removeChild(messageContainer.firstChild);
        }
        // get values from previous last message to determine whether or not to scroll
        let lastMessage = messageContainer.lastElementChild;
        let lastMessageStyles = lastMessage ? getComputedStyle(lastMessage) : null;
        // console.log(lastMessage);
        // console.log(lastMessageStyles);
        let visibleHeight = messageContainer.offsetHeight;
        let newMessageHeight = lastMessage?.offsetHeight;

        // append new message
        let messageFrame = document.createElement('div');
        messageFrame.className = 'message-frame';
        let messageElement = document.createElement('p');
        messageElement.className='message';
        messageElement.innerHTML = text;
        messageFrame.appendChild(messageElement);
        messageContainer.appendChild(messageFrame);
        // console.log('scroll height:', messageContainer.scrollHeight, '\nscroll top:', 
        // messageContainer.scrollTop, '\nvisible height:', visibleHeight, '\nmessage height:', newMessageHeight);
        if(messageContainer.scrollTop > 0 && messageContainer.scrollHeight - messageContainer.scrollTop < visibleHeight + newMessageHeight * 1.25) {
            // scroll
            autoscroll();
            
        }
        
        
    }

    const autoscroll = () => {
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.offsetHeight;
    }
</script>
<svelte:window on:keypress={keyHandler} />

<h2 id="room-id">Room {$roomID}</h2>
<div class="chat-frame">
    <div id="message-container" bind:this={messageContainer}>
        <!-- <template>
            <div class="message-frame">
                <p class="message"></p>
            </div>
        </template> -->
    </div>
    <form class="input-container" on:submit|preventDefault={sendMessage}>
        <textarea class="chat-input" bind:value={message} placeholder="Type your message here" />
        <div class="submit-button-container">
            <button type="submit" class="submit-button">Send</button>
        </div>
    </form>
</div>

<style>
    #room-id {
        text-align: center;
    }
    .chat-frame {
        width: 700px;
        height: 700px;
        border: 1px solid black;
    }

    #message-container {
        width: 100%;
        height: 90%;
        border-bottom: 1px solid black;
        overflow: scroll;
    }

    .input-container {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
    }

    .chat-input {
        width: 90%;
        height: 100%;
        word-wrap: break-word;
        white-space: initial;
        font-size: 1.25rem;
        resize: none;
        outline: none;
        border: none;
        padding: 2px;
    }

    .submit-button-container {
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        
    }

    .submit-button {
        width: 75%;
        height: 50%;
        border: 1px solid black;
        border-radius: 5px;
    }
</style>