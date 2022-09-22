//  Initialise map 
var map = L.map('map').setView([7.0, -1.09], 7);


//  Add Osm  tile layer to map 
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);


var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})
// .addTo(map)


var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



// var marker = L.marker([7,-1.09]).addTo(map);


// Region layer Style 
var regionStyle = {
color :"red",
opacity:0.3,
weight:1,

}

// Health Facility Style 
var healthFaciltystyle = {
    radius:8,
    fillColor:"green",
    color:"red",
    weight:1
}


// Add Geojson Layers 
var regionlayer = L.geoJson(region,{
    style:regionStyle,
    onEachFeature:function (feature, layer) {

        area = (turf.area(feature)/1000000).toFixed(3)
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)


        label= `Name: ${feature.properties.region}<br>` 
        label+=`Area: ${area}<br>` 
        label+=`Center: ${center_lng} , ${center_lat} <br>` 


        layer.bindPopup(label)
    }


}).addTo(map)

var healthsitelayer = L.geoJson(healthfacility,{
    pointToLayer:function(feature, latlng) {
    return L.circleMarker(latlng,healthFaciltystyle);
}
})
// .addTo(map)

var railwaylayer = L.geoJson(railway)
// .addTo(map)



// ADDING WMS LAYER 
// Load wms river Layer
var riverWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:rivers',
    format: 'image/png',
    transparent: true,
    attribution: ""
})
// .addTo(map)


// Load treeCover wms layer
var treeCoverWMS = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:treecover',
    format: 'image/png',
    transparent: true,
    attribution: ""
})
// .addTo(map)







//  Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Street map": googleStreets,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};


// Layers
var overlays = {
    "Region": regionlayer,
    "Health Facilities": healthsitelayer,
    "Rail Lines": railwaylayer,
    "Health Facilities": healthsitelayer,
    "Rivers": riverWMS,
    "Tree Cover": treeCoverWMS
};


 

//  Add layer control to map 
L.control.layers(baseLayers, overlays,{collapsed:false}).addTo(map);


// Add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);


// mouse move Coordinate 
map.on("mousemove",function(e) {
	
   $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng:${e.latlng.lng.toFixed(3)}`)
})




//  Adding scale to map
L.control.scale().addTo(map);

