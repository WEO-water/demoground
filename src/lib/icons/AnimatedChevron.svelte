<svg
	class={$$restProps.class || ''}
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="1.5"
	stroke="currentColor"
	aria-hidden="true"
	xmlns="http://www.w3.org/2000/svg"
>
	<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

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
