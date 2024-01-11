<script lang="ts">
	import Eye from '$lib/icons/Eye.svelte';
	import EyeStrike from '$lib/icons/EyeStrike.svelte';
	import Trash from '$lib/icons/Trash.svelte';
	import { layers } from '$lib/layerStore';
	export let name: string = '';
	export let id: number;
	export let visible: boolean = true;
	export let removable: boolean = false;
	export let color: string;

	function toggleVisibility() {
		visible = !visible;
		const nextlayers = $layers.map((p) => (p.title === name ? { ...p, visible: visible } : p));
		layers.update((l) => nextlayers);
	}
	function removeLayer() {
		layers.removeLayer(id);
	}

</script>

<div
	class="group flex items-center rounded-md text-xs font-medium w-full"
>		
	{#if removable}
		<button on:click={removeLayer} class="hover:bg-gray-200 p-1 rounded-md mr-1">
			<Trash class="w-4 h-4 flex-shrink-0" />
		</button>
	{:else}
		<button disabled class=" p-1 rounded-md mr-1">
			<Trash class="w-4 h-4 flex-shrink-0 text-gray-300" />
		</button>
	{/if}
	<button on:click={toggleVisibility} class="hover:bg-gray-200 p-1 rounded-md mr-3">
		{#if visible}
			<Eye class="w-4 h-4  flex-shrink-0" />
		{:else}
			<EyeStrike class="w-4 h-4 flex-shrink-0" />
		{/if}
	</button>
	<div class="circle mr-1" style:background={color}></div>{name} 
</div>

<style>            
    .circle {
        border-radius: 50%;
        width: 7px;
        height: 7px;
    }
</style>