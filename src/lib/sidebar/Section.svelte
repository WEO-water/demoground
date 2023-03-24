<script lang="ts">
	import AnimatedChevron from '$lib/icons/AnimatedChevron.svelte';

	export let opened: boolean = false;

	function toggleOpened() {
		opened = !opened;
	}
</script>

<section>
	<button
		class=" text-gray-900 group flex items-center rounded-md px-2 py-2 text-sm font-large w-full hover:bg-gray-100"
		on:click={toggleOpened}
	>
		<AnimatedChevron
			class="chevron text-gray-500 mr-3 h-6 w-6 flex-shrink-0 {opened ? 'opened' : ''}"
		/>
		<slot name="title" />
	</button>

	{#if opened}
		<div>
			<slot />
		</div>
	{/if}
</section>
