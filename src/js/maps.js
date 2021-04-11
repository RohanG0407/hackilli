import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oYW5nIiwiYSI6ImNqdGM1eThxcjB0OHU0NHA0NnE2ZHRsa2UifQ.MV8JZhwT4IeduQPcy2zSAg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/rohang/cknctgykd0hxe17mv7u0ay4vx', // style URL
    center: [-88.2272, 40.1020], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

//let user_location = navigator.geolocation.getCurrentPosition()


function addMarker(position) {

}
