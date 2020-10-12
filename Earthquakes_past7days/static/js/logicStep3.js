// Add console.log to check to see if the code is working
console.log('working');

// Create the street view tile layer 
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view tile layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
  };
  
// Create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
       // Turn each feature into a circleMarker on the map
       pointToLayer: function(feature, latlng) {
           console.log('data', data);
           return L.circleMarker(latlng);
        },
        // Set the style for each circleMarker using the styleInfo function
        style: styleInfo,
        // Create a popup for each circleMarker
        onEachFeature: function(feature, layer) {
            layer.bindPopup('Magnitude: ' + feature.properties.mag + '<br>Location: ' + feature.properties.place);
        } 
    }).addTo(map);
});

// Define a function that returns the style data for each earthquake
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
};

// Define a function that returns the color of the earthquake marker based on its magnitude
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
};

// Define a function that determines the radius of the earthquake marker based on its magnitude
function getRadius(magnitude) {
    // If the earthqake has a magnitude of 0, then plot it with a radius of 1
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
};
