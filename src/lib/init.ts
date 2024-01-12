import { layers } from '$lib/stores/layerStore';
import type { OSMMapLayer } from '$lib/types/MapLayer';


export function init() {
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const tileLayerOptions = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }

    const osmMap: OSMMapLayer = {
        type: 'OSM', title: 'Opentreet Maps', visible: true, tileUrl: tileUrl, tileLayerOptions
    }
    layers.addLayer(osmMap)
}