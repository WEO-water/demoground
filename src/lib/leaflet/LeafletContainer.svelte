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

	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

    const geoJsonOptions = {
        style: function(geoJsonFeature) {
            console.log('style', geoJsonFeature);
            return {};
        },
        onEachFeature: function(feature, layer) {
            console.log('onEachFeature', feature, layer);
        },
		pointToLayer: function(feature, latlng) {
			return L.circleMarker(latlng, geojsonMarkerOptions);
		},
		filter: function(feature) {
			return feature.properties.id < 100000
		},
		coordsToLatLng: function(coords) {
			console.log("coords", coords)
			let latLng = coordsToLatLng(coords)
			return L.latLng(latLng[1], latLng[0])
		}
    };

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
	


</script>

<div id="map">
	<LeafletMap options={mapOptions} bind:this={leafletMap}>
		{#each $layers as layer}
			{#if layer.visible}
				{#if layer.type == 'OSM'}
					<TileLayer url={layer.tileUrl} options={layer.tileLayerOptions} />
				{/if}
				{#if layer.type == 'GEOJson'}
					<GeoJSON data={layer.data} options={layer.options} events={['click', 'mouseover']} 
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
