<script lang="ts">
	export let title: string = 'Title';
	export let opened: boolean = false;

	function toggleOpened() {
		opened = !opened;
	}
</script>

<section>
	<button
		class=" text-gray-900 group flex items-center rounded-md px-2 py-2 text-base font-large w-full hover:bg-gray-100"
		on:click={toggleOpened}
	>
		<svg
			class="chevron text-gray-500 mr-3 h-6 w-6 flex-shrink-0"
			class:opened
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>

		<svg
			class="text-gray-500 mr-1 h-6 w-6 flex-shrink-0"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
			/>
		</svg>
		{title}
	</button>

	{#if opened}
		<div>
			<slot />
		</div>
	{/if}
</section>

<style lang="postcss">
	:root {
		--transition-duration: 350ms;
		--transition-timing-function: ease-in-out;
	}

	.chevron {
		transform: rotate(-90deg);
		transition: transform var(--transition-duration) var(--transition-timing-function);
	}
	.opened {
		transform: rotate(0);
	}
</style>
