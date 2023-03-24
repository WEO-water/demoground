<script lang="ts">
	import { layers } from '$lib/stores';
	import Section from '$lib/sidebar/Section.svelte';
	import LayerNavEntry from '$lib/sidebar/LayerNavEntry.svelte';
	import StackFolders from '$lib/icons/StackFolders.svelte';
</script>

<!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
<Section>
	<span slot="title" class="flex ">
		<StackFolders class="text-gray-500 mr-1 h-6 w-6 flex-shrink-0" />Layers
	</span>
	<ul class="list-disc">
		{#each $layers as item}
			<li>
				<LayerNavEntry name={item.name} visible={item.visible} />
			</li>
		{/each}
	</ul>
</Section>
