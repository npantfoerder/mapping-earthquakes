# Mapping Earthquakes with JavaScript and APIs

## Purpose
A hypothetical company, Disaster Reporting Network, provides data driven storytelling on disasters around the world. The head of the disaster response team needs help building insightful and easy to use maps with interactive features on earthquakes from around the world. The goal is to use JavaScript along with the Leaflet library to retreive the coordinates and magnitudes from the latest earthquake GeoJSON data on the U.S. Geological Survey website to achieve the following:
- Visually represent each earthquake by a circle whose size and color is based on magnitude
- Create popup markers for each earthquake that, when clicked, show the magnitude and location
- Plot the data on a Mapbox map through an API request
- Add fault lines to illustrate the relationship between the location and frequency of seismic activity and tectonic plates 

<img src='https://github.com/npantfoerder/mapping-earthquakes/blob/master/EarthquakeMap.png' width=800>

### Resources
- Data Sources: 
  - Real-time earthquake data from https://www.usgs.gov/natural-hazards/earthquake-hazards/data-tools
  - Tectonic plate data from https://github.com/fraxen/tectonicplates
- Software: JavaScript 1.7, Virtual Studio Code 1.48.2
