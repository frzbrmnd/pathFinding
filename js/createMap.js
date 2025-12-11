var mainSource = new ol.source.ImageWMS({
    url: 'http://path.com/cgi-bin/mapserv?map=/var/www/path.com/public_html/main.map',
    params: {'LAYERS': 'earth'},
    crossOrigin: 'anonymous',
});


var bg = new ol.layer.Image({
    source: mainSource,
});

//with different mapfile for each layer
/*var river = new ol.layer.Image({                                              
  source: new ol.source.ImageWMS({
    url: 'http://localhost:8080/cgi-bin/mapserv.exe?map=/ms4w/Apache/htdocs/pathFinding/rivers.map',
    params: {'LAYERS': 'rivers'},
    crossOrigin: 'anonymous'
  }),
});*/

var view = new ol.View({
    projection: 'EPSG:4326',
    center: [51.042,35],
    //center: [5658666,4160751],
    zoom: 11.35,
    minZoom: 10,
    maxZoom: 13,
});

var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(6),
    projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById("coordinate"),
    undefinedHTML: '&nbsp;'
});

var controls = ol.control.defaults({rotate: false}).extend([mousePositionControl]); 
var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});

var map = new ol.Map({
    layers: [bg],
    target: 'map',
    view: view,
    controls: controls,
    interactions: interactions
});


//for legend if necessary
/*var updateLegend = function (resolution) {
    var graphicUrl1 = mySource.getLegendUrl(resolution, {'LAYER': 'roads', 'VERSION': '1.1.0'});
    var img1 = document.getElementById('legend1');
    img1.src = graphicUrl1;


    var graphicUrl2 = mySource.getLegendUrl(resolution, {'LAYER': 'rivers', 'VERSION': '1.1.0'});
    var img2 = document.getElementById('legend2');
    img2.src = graphicUrl2;
  
    var graphicUrl3 = mySource.getLegendUrl(resolution, {'LAYER': 'landuse', 'VERSION': '1.1.0'});
    var img3 = document.getElementById('legend3');
    img3.src = graphicUrl3;
};
*/






