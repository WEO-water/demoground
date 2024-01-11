<script lang="ts">
	import { coordsToLatLng, transform } from '$lib/geo/geo-tools';
    import { layers } from '$lib/layerStore'
    import type {GEOJsonMapLayer, WFSMapLayer} from '$lib/types/MapLayer'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function onCloseForm() {
        dispatch('message', {
            action: 'close'
        });
    }
	let title = 'T';
    let url = 'https://api.weo-water.net/geoserver/wfs/vdl';
    let layerName = '';
    let username = 'vdl_user';
    let password = 'Pass12345!';
    let wfsFeatures = [];
    function validate() {
		console.log("I'm the validate() function")
	}
    function xml2json(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName.toLowerCase();

                if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xml2json(item);
                } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xml2json(item));
                }
            }
            } else {
            obj = xml.textContent;
            }
            return obj;
        } catch (e) {
            console.log(e.message);
        }
    }
    async function fetchWfsCapabilities(){
        wfsFeatures = []
        let urlWfs = url + '?service=WFS&version=1.0.0&request=GetCapabilities'
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        let response = await fetch(urlWfs, {headers, method:'GET'})
        let responseText = await response.text()
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(responseText, "text/xml");
        let json = xml2json(xmlDoc)
        wfsFeatures = json['wfs_capabilities']['featuretypelist']['featuretype']

    }
    function handleSave(){
        console.log("I'm the handleOnSubmit() in App.svelte")
        console.log(title)
        console.log(url)
        console.log(layerName)
    }
    async function addFeatureLayer(feature){
        console.log(feature)
        let featureURL = buildWFSLayerURL(url, feature.name)
        console.log(featureURL)
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        let response = await fetch(featureURL, {headers, method:'GET'}).then((response) => {return response.json()})

        const geojsonMarkerOptions = {
            radius: 6,
            fillColor: "#AAFF00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
        };
        const geoJsonOptions = {
            style: function(geoJsonFeature) {
                return {};
            },
            onEachFeature: function(feature, layer) {
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            filter: function(feature) {
                return feature.properties.id < 100000
            },
            coordsToLatLng: function(coords) {
                let latLng = coordsToLatLng(coords)
                return L.latLng(latLng[1], latLng[0])
            }
        };

        let newLayer:GEOJsonMapLayer = {type:'GEOJson', title: title, visible:true, data:response, removable:true, options:geoJsonOptions}
        layers.addLayer(newLayer)
    }
    function buildWFSLayerURL(baseUrl:string, featureName:string):string{
        const data = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            maxFeatures: '10000',
            outputFormat: 'application/json ',
            typeName: featureName,
        };
        let params = new URLSearchParams(data);
        return baseUrl + '?' + params.toString() 
    }
</script>

<div>
    <h3 class="text-lg">New Layer</h3>
    <div class="mb-4">
        <form on:submit={handleSave}>
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                Layer title
            </label>
            <input bind:value={title} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline" id="title" type="text" >
            <label class="block text-gray-700 text-sm font-bold mb-2" for="url">
                WFS Url
            </label>
            <input bind:value={url} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline" id="url" type="text">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
            </label>
            <input bind:value={username} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline" id="username" type="text" >
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
            </label>
            <input bind:value={password} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline" id="password" type="password">
            <div class="flex items-center justify-between">
                <button class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button" on:click={fetchWfsCapabilities}>
                    Fetch Layers
                </button>
            </div>
            {#if wfsFeatures.length > 0}
                <h5>Avaiable Features</h5>
                <div class="overflow-hidden rounded-md bg-white shadow">
                    <ul role="list" class="divide-y divide-gray-200">
                    {#each wfsFeatures as feature}
                    <li class="px-2 py-1">
                        <button class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={(ev) => {addFeatureLayer(feature)}}>
                            Add
                        </button>
                        {feature.title}
                    </li>
                    {/each}
                    </ul>
                </div>
            {/if}

            <div class="flex items-center justify-between">

                <button class="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={onCloseForm}>
                    Close form
                </button>
            </div>
        </form>
    </div>
</div>
