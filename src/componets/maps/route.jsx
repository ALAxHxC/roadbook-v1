// create a function to make a directions request
import mapboxgl from '!mapbox-gl'; 
export default async function getRoute(start, end, map,waypoint) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start.lng},${start.lat};${end.lng},${end.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
    const json = await query.json();
    console.log(json);
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',	
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    };
    // if the route already exists on the map, we'll reset it using setData
    /*if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
    }*/
    // otherwise, we'll make a new request
    // else {
    map.addLayer({
        id: `route-${waypoint}`,
        type: 'line',
        source: {
            type: 'geojson',
            data: geojson
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
        }
    });
    return data.distance;
    //}
    // add turn instructions here at the end
}
