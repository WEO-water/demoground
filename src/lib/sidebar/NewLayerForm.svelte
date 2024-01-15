<script lang="ts">
	import { coordsToLatLng, transform } from '$lib/geo/geo-tools';
    import { layers } from '$lib/stores/layerStore'
    import type {GEOJsonMapLayer, WFSMapLayer} from '$lib/types/MapLayer'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    function onCloseForm() {
        dispatch('message', {
            action: 'close'
        });
    }
	let title = '';
    let url = '';
    let layerName = '';
    let username = '';
    let password = '!';
    let wfsFeatures = [];
    let color ="#6590D5"
    let pointSize = "small"
    let selectedLayer:GEOJsonMapLayer | null = null; 
    function validate() {
        if (!url && !username && !password){
            return false
        }
		return true
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
    function resetForm(){
        title = ''
        url = ''
        layerName = ''
        username = ''
        password = ''
        wfsFeatures = ''
        color =""
        pointSize = ''
        selectedLayer = ''
    }
    function resetLayers(){
        wfsFeatures = []
    }
    
    async function selectFeatureLayer(feature){
        let featureURL = buildWFSLayerURL(url, feature.name)
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password))
        let response = await fetch(featureURL, {headers, method:'GET'}).then((response) => {return response.json()})


        const geoJsonOptions = {

        };
        title = feature.title
        selectedLayer = {id: 0, position:0, featureCount: response.features.length, orgLayerTitle:feature.title, type:'GEOJson', title: title, visible:true, data:response, removable:true, options:geoJsonOptions, color: ''}     
    }
    function addLayer(){
        const geojsonMarkerOptions = {
            radius: 6,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        const geoJsonOptions = {
            style: function(geoJsonFeature) {
                return geojsonMarkerOptions;
            },
            onEachFeature: function(feature, layer) {
                // console.log("Each Feature, ", feature)
            },
            pointToLayer: function(feature, latlng) {
                // console.log("pointToLayer, ", feature)
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            filter: function(feature) {
                return true
            },
            coordsToLatLng: function(coords) {
                let latLng = coordsToLatLng(coords)
                return L.latLng(latLng[1], latLng[0])
            }
        };
        selectedLayer.options = geoJsonOptions
        selectedLayer.color = color
        layers.addLayer(selectedLayer)
        resetForm()
        dispatch('message', {
            action: 'close'
        });
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

<div class="bg-gray-200 py-2 px-1">
    <h3 class="text-xs font-semibold leading-3 text-gray-800">New WFS Layer</h3>
    <div class="mb-4">
        {#if wfsFeatures.length == 0}
            <form >
                <label class="block text-gray-700 text-sm font-bold mt-1" for="url">
                    WFS Url
                </label>
                <input bind:value={url} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline text-sm" id="url" type="text">
                <label class="block text-gray-700 text-sm font-bold mt-1" for="username">
                    Username
                </label>
                <input bind:value={username} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline  text-sm" id="username" type="text" >
                <label class="block text-gray-700 text-sm font-bold mt-1" for="password">
                    Password
                </label>
                <input bind:value={password} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline  text-sm" id="password" type="password">
                <div class="flex items-center justify-between mt-2">
                    <button disabled={!validate()} class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button" on:click={fetchWfsCapabilities}>
                        Fetch Layers
                    </button>
                    <button class="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={onCloseForm}>
                        Close
                    </button>
                </div>
            </form>
        {:else if selectedLayer == null }
            <div>
                <div class="flex items-center justify-between mt-2">
                    <button class="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={resetLayers}>
                        Back
                    </button>
                </div>
                <h3 class="text-xs font-semibold leading-5 text-gray-800">Layers</h3>
                <div class="">
                    <ul role="list" class="divide-y divide-gray-400">
                        {#each wfsFeatures as feature}
                            <li class="py-1">
                                <button class="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={(ev) => {selectFeatureLayer(feature)}}>
                                    Pick
                                </button>
                                {feature.title}
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        {:else if selectedLayer != null}
        <div>
            <div class="flex items-center justify-between mt-2">
                <button class="inline-block rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" on:click={() => {selectedLayer = null}}>
                    Back
                </button>
            </div>
            <h3 class="text-xs font-semibold leading-5 text-gray-800">Style {selectedLayer.orgLayerTitle}</h3>
            <label class="block text-gray-700 text-sm font-bold" for="title">
                Layer title
            </label>
            <input bind:value={title} class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700  focus:outline-none focus:shadow-outline  text-sm" id="title" type="text" >
            <label class="block text-gray-700 text-sm font-bold" for="title">
                Color
            </label>
            <input bind:value={color} id="nativeColorPicker1" type="color" />
            <label class="block text-gray-700 text-sm font-bold" for="title">
                Preview
            </label>
            <div id="circle" style:background={color}></div>
            <div class="flex items-center justify-between mt-2">
                <button class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button" on:click={addLayer}>
                    Save
                </button>
            </div>
        </div>
        {/if}
    </div>
</div>

<style>            
    #circle {
        border-color: '#000';
        border-radius: 50%;
        width: 20px;
        height: 20px;
    }
</style>