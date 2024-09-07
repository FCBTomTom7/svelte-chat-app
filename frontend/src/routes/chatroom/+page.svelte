<script>
    import Chatroom from "$lib/Chatroom.svelte";
    import { user } from "../../user";
    // import {invalidateAll} from '$app/navigation';
    // invalidateAll()
    export let data;
    // console.log('before logic');
    // console.log('/chatroom, data',data);
    // console.log('/chatroom, user', $user)
    // $user = data.name ? {name: data.name} : null;
    // if($user === null && data.name !== null) {
    //     $user = {name: data.name};
    // } else if(data.name === null) {
    //     $user = null;
    // }
    if($user === null && data.name !== null) {
        $user = {name: data.name};
    } else if(data.name === null) {
        $user = null;
    }
    // console.log('after logic');
    // console.log('/chatroom, data',data);
    // console.log('/chatroom, user', $user)
</script>

<Chatroom />