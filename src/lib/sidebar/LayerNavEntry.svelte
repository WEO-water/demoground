<script lang="ts">
	import Eye from '$lib/icons/Eye.svelte';
	import EyeStrike from '$lib/icons/EyeStrike.svelte';
	import { layers } from '$lib/stores';
	export let name: string = '';
	export let visible: boolean = true;

	function toggleVisibility() {
		visible = !visible;
		const nextlayers = $layers.map((p) => (p.name === name ? { ...p, visible: visible } : p));
		layers.update((l) => nextlayers);
	}
</script>

<button
	class="group flex items-center rounded-md px-2 py-2 text-xs font-medium w-full hover:bg-gray-100"
	on:click={toggleVisibility}
>
	{#if visible}
		<Eye class="w-4 h-4 mr-3 flex-shrink-0" />
	{:else}
		<EyeStrike class="w-4 h-4 mr-3 flex-shrink-0" />
	{/if}
	{name}
</button>
