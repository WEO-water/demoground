<script>
	import { LeafletMap, TileLayer, GeoJSON } from 'svelte-leafletjs';
	import { layers } from '$lib/layerStore';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';

    let geoJsonData;

    onMount(async () => {
        const response = await fetch('example.geojson')
        geoJsonData = await response.json()
    });

    const geoJsonOptions = {
        style: function(geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function(feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
    };



	let leafletMap;
	const mapOptions = {
		center: [49.59103292276794, 6.128027686709844],
		zoom: 13
	};



</script>

<div id="map">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		{#each $layers as layer}
			{#if layer.visible}
				<TileLayer url={layer.tileUrl} options={layer.tileLayerOptions} />
			{/if}
		{/each}
		<GeoJSON data={geoJsonData} options={geoJsonOptions}/>
	</LeafletMap>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	#map {
		height: 100vh;
	}
</style>
