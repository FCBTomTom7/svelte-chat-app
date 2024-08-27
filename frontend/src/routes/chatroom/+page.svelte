<script>
    import Chatroom from "$lib/Chatroom.svelte";
    import { user } from "../../user";
    export let data;
    console.log('dataname', data.name);
    if($user === null && data.name !== null) $user = {name: data.name};
</script>

<Chatroom />