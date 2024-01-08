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

</script>

<!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
<Section opened={true}>
	<span slot="title" class="flex">
		<StackFolders class="text-gray-500 mr-1 h-6 w-6 flex-shrink-0" />Layers
	</span>
	<ul class="list-disc">
		{#each $layers as item}
			<li>
				<LayerNavEntry name={item.title} visible={item.visible} />
			</li>
		{/each}
		{#if !temporaryLayerVisible}
			<li> 
				<button
					class="group flex items-center rounded-md px-2 py-2 text-xs font-medium w-full hover:bg-gray-100"
					on:click={addLayer}
				>
					<Plus class="w-4 h-4 mr-3 flex-shrink-0" />
					Add layer
				</button>
			</li>
		{:else}
			<li>
				<NewLayerForm />
			</li>
		{/if}
	</ul>
</Section>
