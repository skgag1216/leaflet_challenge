// Establish a URL var to the geoJSON and read in with D3
url = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
d3.json(url).then(importedData => {
    console.log(importedData)
});

//var map = L.map('map').setView([40, -90], 13);

// Create the tile layer that will be the background of our map.
// L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
// 	maxZoom: 20,
// 	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
// });

// Perform an API call to the USGS GeoJSON to get the station information. Call createMarkers when it completes.
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);