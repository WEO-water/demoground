<script lang="ts">
	import { layers } from '$lib/layerStore';
	import Section from '$lib/sidebar/Section.svelte';
	import LayerNavEntry from '$lib/sidebar/LayerNavEntry.svelte';
	import StackFolders from '$lib/icons/StackFolders.svelte';
	
	import Plus from '$lib/icons/Plus.svelte';
	import NewLayerForm from './NewLayerForm.svelte';
	import type { OSMMapLayer } from '$lib/types/MapLayer';

	export let temporaryLayerVisible: boolean = false;
	function addLayer() {
		temporaryLayerVisible = true;
	}
	let closeNewLayerForm = () => {
		temporaryLayerVisible = false;
	}
</script>

<section>
	{#if !temporaryLayerVisible}
		<button
			class="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			on:click={addLayer}
		>
			Add layer
		</button>
	{:else}
		<NewLayerForm on:message={closeNewLayerForm}/>
	{/if}
</section>
<Section opened={true}>
	<span slot="title" class="flex">
		<StackFolders class="text-gray-500 mr-1 h-6 w-6 flex-shrink-0" />Layers
	</span>
	<ul class="list-disc">
		{#each $layers as item}
			<li>
				<LayerNavEntry name={item.title} visible={item.visible} removable={item.removable}/>
			</li>
		{/each}
	</ul>
</Section>