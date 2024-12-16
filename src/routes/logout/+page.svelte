<script lang="ts">
	//import { getWeb3Auth } from "$lib/services/authentication";
	import { onMount } from "svelte";

    onMount(async () => {
        //await getWeb3Auth().logout()
		window.location.href = '/'
    })

</script>