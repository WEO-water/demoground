<script lang="ts">
	import { layers } from '$lib/layerStore';
	import Section from '$lib/sidebar/Section.svelte';
	import LayerNavEntry from '$lib/sidebar/LayerNavEntry.svelte';
	import StackFolders from '$lib/icons/StackFolders.svelte';
	
	import Plus from '$lib/icons/Plus.svelte';
	import NewLayerForm from './NewLayerForm.svelte';
	import NewLayerButtons from './NewLayerButtons.svelte';

	export let newLayerFormType: string;

	let closeNewLayerForm = () => {
		newLayerFormType = '';
	}
	let onAddLayer = (type:string) => {
		newLayerFormType = type
	}
	function compareByPosition(a, b) {
		return b.position - a.position;
	}
</script>

<section>
	{#if !newLayerFormType}
		<NewLayerButtons onAddLayer={(type) => {onAddLayer(type)}}/>
	{:else}
		<hr class="h-px my-1 bg-gray-200 border-0">
		<NewLayerForm on:message={closeNewLayerForm}/>
	{/if}
</section>

<section>
	<hr class="h-px my-2 bg-gray-200 border-0 ">
	<div class="text-xs font-semibold leading-6 text-gray-800">Layers</div>
	<ul class="list-disc">
		{#each $layers.sort(compareByPosition) as item}
			<li>
				<LayerNavEntry id={item.id} name={item.title} visible={item.visible} removable={item.removable} color={item.color}/>
			</li>
		{/each}
	</ul>
</section>