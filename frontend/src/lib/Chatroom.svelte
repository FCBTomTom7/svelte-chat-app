<script>
    import { io } from "socket.io-client";
    import { onMount } from 'svelte';
    import { roomID } from "../room";
    import { user } from "../user";
    import NewMessages from "./NewMessages.svelte";
    
    const SOCKET_URL = "http://localhost:3000";
    const socket = io(SOCKET_URL);
    const colorOptions = ["#9c7c7c", "#d3c88c", "#425940", "#4F7876", "#736185"]
    const nameColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]


    socket.emit('socket info', {id: $roomID, username: $user.name, c: nameColor});
    let message = '';
    let messageContainer;
    const maxMessages = 100;

    let scrollHeight;
    let scrollTop;
    let newMessageHeight;
    let newMessageCount = 0;
    let paused = false;
    onMount(() => {
        socket.emit('new user', {username: $user ? $user.name : null, color: nameColor});
        // console.log($user);
        socket.on('message', ({message, name, color}) => {
            //console.log(name);
            appendMessage(message, name, color);
        })

        socket.on('new user', ({username, color}) => {
            appendNewUser(username, color);
        })

        socket.on('user left', ({name, color}) => {
            appendNewUser(name, color, true);
        })
        return () => {
            socket.removeAllListeners();
        }
    })

    const appendNewUser = (name, color, left=false) => {
        while(messageContainer.childNodes.length >= maxMessages) {
            messageContainer.removeChild(messageContainer.firstChild);
        }

        let lastMessage = messageContainer.lastElementChild;
        // let lastMessageStyles = lastMessage ? getComputedStyle(lastMessage) : null;
        // console.log(lastMessage);
        // console.log(lastMessageStyles);
        let visibleHeight = messageContainer.offsetHeight;
        newMessageHeight = lastMessage?.offsetHeight;
        // append new message
        let messageFrame = document.createElement('div');
        messageFrame.className = 'message-frame';

        let messageElement = document.createElement('p');
        messageElement.className='message';
        // console.log(color);
        if(!left) {
            messageElement.innerHTML = name ? '<span class="sender-name" style="color: ' + color + '">' + name + ' </span>'
        + 'has joined the chat' : 'Guest user has joined the chat';
        } else {
            messageElement.innerHTML = name ? '<span class="sender-name" style="color: ' + color + '">' + name + ' </span>'
        + 'has left the chat' : 'Guest user has left the chat';
        }
        
        messageFrame.appendChild(messageElement);
        messageContainer.appendChild(messageFrame);

        scrollHeight = messageContainer.scrollHeight;
        scrollTop = messageContainer.scrollTop;
        // console.log('scroll height:', messageContainer.scrollHeight, '\nscroll top:', 
        // messageContainer.scrollTop, '\nvisible height:', visibleHeight, '\nmessage height:', newMessageHeight);
        if(scrollHeight - scrollTop < 
        visibleHeight + newMessageHeight * 2) {
            // scroll
            autoscroll();
            
        }
        // scrollTop is area that is scrolled above visible area
        // visible height is the amount of the element that can be seen at a time.
        // scrollHeight is total length of the element
        
        if(paused) {
            newMessageCount++;
        }
    }

    const sendMessage = async () => {
        if(!/^\s*$/.test(message)) socket.emit('message', {message, name: $user.name, color: nameColor});
        message = '';
    }

    const appendMessage = (text, name, color) => {
        while(messageContainer.childNodes.length >= maxMessages) {
            messageContainer.removeChild(messageContainer.firstChild);
        }
        // get values from previous last message to determine whether or not to scroll
        let lastMessage = messageContainer.lastElementChild;
        // let lastMessageStyles = lastMessage ? getComputedStyle(lastMessage) : null;
        // console.log(lastMessage);
        // console.log(lastMessageStyles);
        let visibleHeight = messageContainer.offsetHeight;
        newMessageHeight = lastMessage?.offsetHeight;
        // append new message
        let messageFrame = document.createElement('div');
        messageFrame.className = 'message-frame';

        let messageElement = document.createElement('p');
        messageElement.className='message';
        // console.log(color);
        messageElement.innerHTML = '<span class="sender-name" style="color: ' + color + '">' + name + ': </span>' + text;
        messageFrame.appendChild(messageElement);
        messageContainer.appendChild(messageFrame);

        scrollHeight = messageContainer.scrollHeight;
        scrollTop = messageContainer.scrollTop;
        // console.log('scroll height:', messageContainer.scrollHeight, '\nscroll top:', 
        // messageContainer.scrollTop, '\nvisible height:', visibleHeight, '\nmessage height:', newMessageHeight);
        if(scrollHeight - scrollTop < 
        visibleHeight + newMessageHeight * 2) {
            // scroll
            autoscroll();
            
        }
        // scrollTop is area that is scrolled above visible area
        // visible height is the amount of the element that can be seen at a time.
        // scrollHeight is total length of the element
        
        if(paused) {
            newMessageCount++;
        }
    }

    const autoscroll = () => {
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.offsetHeight;
    }

    const scrollHandler = () => {
        scrollHeight = messageContainer.scrollHeight;
        scrollTop = messageContainer.scrollTop;

        paused = messageContainer && scrollHeight - scrollTop >= 
        messageContainer.offsetHeight + newMessageHeight * 2;

        if(!paused) newMessageCount = 0;
    }

    const textAreaHandler = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    }
</script>

<h2 id="room-id">Room {$roomID}</h2>
<div class="chat-frame">
    <div id="message-container" class="scrollable" bind:this={messageContainer} on:scroll={scrollHandler}>
        <!-- <template>
            <div class="message-frame">
                <p class="message"></p>
            </div>
        </template> -->
    </div>
    <form class="input-container" on:submit|preventDefault={sendMessage}>
        <textarea class="chat-input scrollable" bind:value={message} placeholder="Type your message here" on:keypress={textAreaHandler}/>
        <div class="submit-button-container">
            <button type="submit" class="submit-button">Send</button>
        </div>
    </form>
    {#if messageContainer && scrollHeight - scrollTop >= 
        messageContainer.offsetHeight + newMessageHeight * 2}
        <div id="new-messages-wrapper">
            <NewMessages clickFunction={autoscroll} messageCount={newMessageCount}/>
        </div>
    {/if}
</div>

<style>
    #new-messages-wrapper {
        position: absolute;
        top: 80%;
        left: 40%;
        width: 20%;
        height: 3.75%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #room-id {
        text-align: center;
        /* color: rgb(174, 168, 168); */
        font-weight: bolder;
        font-size: 2rem;
        background-color: #292828;
    }

    .chat-frame {
        width: 700px;
        height: 700px;
        position: relative;
        border: 2px solid rgb(123, 119, 119);
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 0 0 5px 3px rgb(32, 31, 31);
    }

    #message-container {
        width: 100%;
        height: 90%;
        border-bottom: 2px solid rgb(123, 119, 119);
        overflow: scroll;
        overflow-x: hidden;
        /* scrollbar-color: rgb(104, 103, 103) transparent;
        scrollbar-width: thin; */
    }


    .input-container {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: start;
        
        position: relative;
    }


    .chat-input {
        width: 90%;
        height: 70%;
        word-wrap: break-word;
        white-space: initial;
        font-size: 1.25rem;
        resize: none;
        outline: none;
        border: none;
        padding: 2px;
        padding-left: 6px;
        background-color: #292828;
        font-family: inherit;
        color: rgb(174, 168, 168);
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
        border: 0;
        outline: none;
        border-radius: 5px;
        background-color: #565353;
        font-family: inherit;
        color: rgb(174, 168, 168);
    }

    .submit-button:hover {
        background-color: rgb(53, 53, 53);
        border: 1px solid rgb(174, 168, 168);
    }
</style>