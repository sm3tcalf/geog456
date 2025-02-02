var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })

// change this
var lightRailIcon = L.icon({ // notice the L.icon which is a Leaflet object with properties
    iconUrl: 'https://static.thenounproject.com/png/788387-200.png',
    // this points to a jpg image obtained from the internet
    iconSize: [25,25], // size of the icon
    popupAnchor: [0,0] // where the icon is located relative to the lat lon of the point.
    });

var longitudeWpt0 = lightRailStations.features[0].geometry.coordinates[0]
var latitudeWpt0 = lightRailStations.features[0].geometry.coordinates[1]

var myStations = L.geoJSON(lightRailStations, {
    pointToLayer: function (feature, latlng) {
        console.log(feature)
        return L.marker(latlng, {icon: lightRailIcon}).bindPopup("<b>Station Name:</b></br>" + feature.properties.NAME);
    }
}).addTo(map);

myFeatures = lightRailStations.features.map(e => e)

// layers //

var baseLayers = {
    "OpenStreetMap": OSM,
    "ESRI": Esri_WorldImagery
    };

var overlayMaps = {
    "TTD Light Rail Stations": myStations,
};

var layerControl = L.control.layers(baseLayers,overlayMaps).addTo(map);