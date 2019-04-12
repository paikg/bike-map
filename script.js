// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  doubleClickZoom: false 
}).setView([38.905194,-77.030640],11.5);

// Add base layer
L.tileLayer('https://api.mapbox.com/styles/v1/paikg/cjo0c4apm2dev2ro154j8nnmo/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicGFpa2ciLCJhIjoiY2pucnRmNWViMGJ4NTNwbW5scWVxMTZ6ciJ9.nxVHqIlbO325ndMjxn1F0Q', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'gpaik'
});

// Initialze source data
var source = new carto.source.Dataset('listings');

// Create style for the data
var style = new carto.style.CartoCSS(`
 #layer {
  marker-width: 4;
  marker-fill: #ffd400;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 0.75;
  marker-line-color: #8c8c8c;
  marker-line-opacity: 1;
  marker-comp-op: color-dodge;
  [zoom <=10]{marker-width:2} 
  [zoom >=16]{marker-width:8}
}
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);