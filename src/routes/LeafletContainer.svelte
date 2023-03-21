<script>
	import { LeafletMap, TileLayer } from 'svelte-leafletjs';
	import 'leaflet/dist/leaflet.css';

	const mapOptions = {
		center: [1.364917, 103.822872],
		zoom: 11
	};
	const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: '© OpenStreetMap contributors'
	};
</script>

<div id="map" style="height: 80vh;">
	<LeafletMap options={mapOptions}>
		<TileLayer url={tileUrl} options={tileLayerOptions} />
	</LeafletMap>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	.map {
		height: 800px;
	}
</style>
