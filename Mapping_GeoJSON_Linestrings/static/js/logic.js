// Add console.log to check to see if the code is working
console.log('working');

// Create the light view tile layer 
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create the dark view tile layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, \
        <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, \
        Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    'Day Navigation': light,
    'Night Navigation': dark
};

// Create the map object with center, zoom level and default layer
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [dark]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/npantfoerder/mapping-earthquakes/master/torontoRoutes.json";

// Create a style for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data
d3.json(torontoData).then(data => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: myStyle,
        // Adding popup markers
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3>" + 'Destination: ' + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});
