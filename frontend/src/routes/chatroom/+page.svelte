<script>
    import Chatroom from "$lib/Chatroom.svelte";
    import { user } from "../../user";
    export let data;
    console.log('dataname', data.name);
    // $user = data.name ? {name: data.name} : null;
    // if($user === null && data.name !== null) {
    //     $user = {name: data.name};
    // } else if(data.name === null) {
    //     $user = null;
    // }
    if($user === null && data.name !== null) $user = {name: data.name};
</script>

<Chatroom />