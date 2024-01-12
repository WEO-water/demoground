import proj4 from 'proj4';
proj4.defs("EPSG:2169", "+proj=tmerc +lat_0=49.8333333333333 +lon_0=6.16666666666667 +k=1 +x_0=80000 +y_0=100000 +ellps=intl +towgs84=-189.6806,18.3463,-42.7695,-0.33746,-3.09264,2.53861,0.4598 +units=m +no_defs")
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs +type=crs");

export function coordsToLatLng(coords) {
    return proj4('EPSG:2169', 'EPSG:4326', coords)
}

export function transform(geoJson: any) {
    const features4326 = geoJson.features.map(feature => {
        if (!feature.geometry) {
            return {
                type: "Feature",
                geometry: null,
                properties: feature.properties
            };
        }
        if (feature.geometry.type == 'Point') {
            let coordinates2169 = feature.geometry.coordinates;
            const coordinates4326 = proj4('EPSG:2169', 'EPSG:4326', coordinates2169);
            return {
                type: "Feature",
                geometry: {
                    type: feature.geometry.type,
                    coordinates: coordinates4326 // Updated coordinates in CRS 4326
                },
                properties: feature.properties
            };
        }

        if (feature.geometry.type == 'MultiPolygon') {
            let coordinates2169 = feature.geometry.coordinates[0][0];
            const coordinates4326 = coordinates2169.map((coords) => (proj4('EPSG:2169', 'EPSG:4326', coords)));
            return {
                type: "Feature",
                geometry: {
                    type: feature.geometry.type,
                    coordinates: [[coordinates4326]] // Updated coordinates in CRS 4326
                },
                properties: feature.properties
            };
        }

    });
    return {
        type: "FeatureCollection",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        features: features4326
    };
}