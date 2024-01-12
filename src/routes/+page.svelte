<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Loader from '$lib/Loader.svelte';
	import SidebarNavigation from '$lib/sidebar/SidebarNavigation.svelte';
	import {init} from '$lib/init'
	import SelectedFeatureInformation from '$lib/meta/SelectedFeatureInformation.svelte';

	let LeafletContainer:any;

	onMount(async () => {
		if (browser) {
			LeafletContainer = (await import('$lib/leaflet/LeafletContainer.svelte')).default;
			init()
		}
	});
	let sidebarOpened: boolean = false;
	function closeSidebar() {
		sidebarOpened = !sidebarOpened;
	}
</script>

<svelte:head>
	<title>Demoground - WEO</title>
	<meta name="description" content="Demoground - WEO" />
</svelte:head>

{#if browser}
	{#if LeafletContainer}
		<div>
			<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
			<div
				class="relative z-40 lg:hidden"
				role="dialog"
				aria-modal="true"
				style={sidebarOpened ? '' : 'display:none;'}
			>
				<!--
					Off-canvas menu backdrop, show/hide based on off-canvas menu state.
			
					Entering: "transition-opacity ease-linear duration-300"
					From: "opacity-0"
					To: "opacity-100"
					Leaving: "transition-opacity ease-linear duration-300"
					From: "opacity-100"
					To: "opacity-0"
				-->
				<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />

				<div class="fixed inset-0 z-40 flex">
					<!--
					Off-canvas menu, show/hide based on off-canvas menu state.
			
					Entering: "transition ease-in-out duration-300 transform"
						From: "-translate-x-full"
						To: "translate-x-0"
					Leaving: "transition ease-in-out duration-300 transform"
						From: "translate-x-0"
						To: "-translate-x-full"
					-->
					<div class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
						<!--
							Close button, show/hide based on off-canvas menu state.
				
							Entering: "ease-in-out duration-300"
							From: "opacity-0"
							To: "opacity-100"
							Leaving: "ease-in-out duration-300"
							From: "opacity-100"
							To: "opacity-0"
						-->
						<div class="absolute top-0 right-0 -mr-12 pt-2">
							<button
								on:click={closeSidebar}
								type="button"
								class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							>
								<span class="sr-only">Close sidebar</span>
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

<div class="flex flex-col h-screen justify-between">
  <header class="h-10 bg-red-500">Header</header>
  <main class="mb-auto h-10 bg-green-500">Content</main>
  <footer class="h-10 bg-blue-500">Footer</footer>
</div>
					</div>

					<div class="w-14 flex-shrink-0">
						<!-- Force sidebar to shrink to fit close icon -->
					</div>
				</div>
			</div>

			<!-- Static sidebar for desktop -->
			<div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
					<div class="flex flex-col h-screen justify-between">
						<div class="h-10 p-1">
							<img
								class="h-8 w-auto"
								src="https://www.weo-water.com/wp-content/uploads/2023/03/weo-logo_web.png"
								alt="WEO Water Logo"
							/>
						</div>
						<main class="mb-auto mt-5 ">
							<SidebarNavigation />
						</main>
						<section class=" ">
							<SelectedFeatureInformation />
						</section>
					</div>
				</div>
			</div>
			<div class="flex flex-1 flex-col lg:pl-64">
				<div class="sticky top-0 z-20 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
					<div class="">
						<button
							on:click={closeSidebar}
							type="button"
							class="float-left -ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Open sidebar</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
						<div class="float-right px-4 ">
							<img
								class="h-8 w-auto"
								src="https://www.weo-water.com/wp-content/uploads/2023/03/weo-logo_web.png"
								alt="WEO Water Logo"
							/>
						</div>
					</div>
				</div>
				<main class="flex-1 z-10">
					<div class="mx-auto  ">
						<svelte:component this={LeafletContainer} />
					</div>
				</main>
			</div>
		</div>
	{:else}
		<div class="flex h-screen">
			<div class="m-auto">
				<Loader />
			</div>
		</div>
	{/if}
{/if}
