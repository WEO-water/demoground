<script lang="ts">
	import { LeafletMap, TileLayer, GeoJSON } from 'svelte-leafletjs';
	import { layers } from '$lib/layerStore';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import { coordsToLatLng } from '$lib/geo/geo-tools';
    let geoJsonData;

    onMount(async () => {
        const response = await fetch('example.geojson')
        geoJsonData = await response.json()
    });



	function featureSelect(event){
		console.log(event.detail.sourceTarget.feature)
	}


	let leafletMap;
	const mapOptions = {
		center: [49.59103292276794, 6.128027686709844],
		zoom: 13
	};
	onMount(() => {
		leafletMap.getMap().on("boxzoomend", function(e) {
			// Find Layer and get features
			const map = leafletMap.getMap()
		});
    });
	

	function compareByPosition(a, b) {
		return a.position - b.position;
	}
</script>

<div id="map">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		{#each $layers.sort(compareByPosition) as layer}
			{#if layer.visible}
				{#if layer.type == 'OSM'}
					<TileLayer url={layer.tileUrl} options={layer.tileLayerOptions} />
				{/if}
				{#if layer.type == 'GEOJson'}
					<GeoJSON 
						data={layer.data} 
						options={layer.options} 
						events={['click', 'mouseover']} 
		 				on:click={featureSelect}/>
				{/if}
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
