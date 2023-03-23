<script>
	import { LeafletMap, TileLayer } from 'svelte-leafletjs';
	import { layers } from '$lib/stores';
	import 'leaflet/dist/leaflet.css';
	let leafletMap;
	const mapOptions = {
		center: [49.59103292276794, 6.128027686709844],
		zoom: 13
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};
	$layers = [...$layers, { name: 'Opentreet Maps', visible: true }];
</script>

<div id="map">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		{#each $layers as layer}
			{#if layer.visible}
				<TileLayer url={tileUrl} options={tileLayerOptions} />
			{/if}
		{/each}
	</LeafletMap>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	#map {
		height: 100vh;
	}
</style>
