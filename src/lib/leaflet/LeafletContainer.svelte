<script lang="ts">
	import { LeafletMap, TileLayer, GeoJSON } from 'svelte-leafletjs';
	import { layers } from '$lib/layerStore';
	import 'leaflet/dist/leaflet.css';
	import { onMount } from 'svelte';
	import { coordsToLatLng } from '$lib/geo/geo-tools';
    let geoJsonData;


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
		leafletMap.getMap().on("layeradd", function(e) {
			// Find Layer and get features
			console.log("LAyer Added", e)
		});
		console.log(leafletMap)
		console.log(leafletMap.getMap().getPanes())
		console.log(leafletMap.getMap().eachLayer((layer) => {
			console.log(layer)
		}))
    });
	

	function compareByPosition(a, b) {
		return b.position - a.position;
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
