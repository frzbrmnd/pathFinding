//a variable showing which tool is active
var mode = "";

//a function to add icon for start, destination and search points on map
function addPointToMap(source, img, lng, lat){
    source.clear();
    var point = new ol.Feature({
        geometry: new ol.geom.Point([lng,lat]), 
    });
    var pointStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor:[0.5, 1],
            scale: 0.05,
            src: 'img/' + img + '.png',
        }),
    });
    point.setStyle(pointStyle);
    source.addFeature(point); 
}
