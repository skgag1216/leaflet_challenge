// Establish a URL var to the geoJSON and read in with D3
queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(queryUrl).then(data => {
    console.log(data);
    createFeatures(data);
});

function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
    function setStyle(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
  
      function getColor(depth) {
      switch (true) {
        case depth > 90:
          return "#581845";
        case depth > 70:
          return "#900C3F";
        case depth > 50:
          return "#C70039";
        case depth > 30:
          return "#FF5733";
        case depth > 10:
          return "#FFC300";
        default:
          return "#DAF7A6";
      }
    }
  
  
    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
  
      return magnitude * 4;
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng){
        return L.circleMarker(latlng)
      },
      style: setStyle,
      onEachFeature: onEachFeature
    });
    console.log(earthquakes)
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    })
    
    var satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Satellite Map": satelliteStreets,
      "Street Map": street,
      "Topographic Map": topo
      
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 3,
      layers: [satelliteStreets, earthquakes]
    });
  
    // Create a layer control.
    // Pass it to our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

  /*Legend specific*/
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend");
      div.innerHTML += "<h4>Depth</h4>";
      div.innerHTML += '<i style="background: #DAF7A6"></i><span><10</span><br>';
      div.innerHTML += '<i style="background: #FFC300"></i><span>10-30</span><br>';
      div.innerHTML += '<i style="background: #FF5733"></i><span>30-50</span><br>';
      div.innerHTML += '<i style="background: #C70039"></i><span>50-70</span><br>';
      div.innerHTML += '<i style="background: #900C3F"></i><span>70-90</span><br>';
      div.innerHTML += '<i style="background: #581845"></i><span>>90</span><br>';

      return div;
  }

  legend.addTo(myMap);
  
};
