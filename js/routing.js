//selecting start or destination on map
map.on('singleclick', function (evt){ 
    if (mode == "selectStart"){
        document.getElementById("start").value=evt.coordinate[1].toFixed(6) + ", " + evt.coordinate[0].toFixed(6);  
        addPointToMap(startPointSource, "start", evt.coordinate[0], evt.coordinate[1]);
        mode = "";
    }else if (mode == "selectDestination"){
        document.getElementById("destination").value=evt.coordinate[1].toFixed(6) + ", " + evt.coordinate[0].toFixed(6);
        addPointToMap(destinationPointSource, "destination", evt.coordinate[0], evt.coordinate[1])
        mode = "";
    }
});

//determine selecting start or destination
var selectPointButtons = document.getElementsByClassName("selectPoint");
for (var i = 0; i < selectPointButtons.length; i++) {
    selectPointButtons[i].addEventListener("click", function(){
        mode = this.id;
        map.removeInteraction(draw);
        measurementType = "";
        if (typeof(helpTooltipElement) != 'undefined') {
            helpTooltipElement.remove();
        }
    });
}

//sending request for shortest path 
document.getElementById("startRouting").addEventListener("click", function(){
    pathSource.clear();
    var start = document.getElementById("start").value.split(",");
    var destination = document.getElementById("destination").value.split(",");
    $.ajax({
        type : "POST",
        url : "../../cgi-bin/test.py",
        data: {
            startLat: start[0],
            startLng: start[1],
            destinationLat: destination[0],
            destinationLng: destination[1]},
        dataType: "text",
        beforeSend: function() {
            
            
            
        },
        success : function(response) {
            pathSource.addFeatures(new ol.format.GeoJSON().readFeatures(response));
        },
        error: function(xhr, status, error) { 
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);            
        }
    });
});

//layers and siurces for start, destination and path
var pathSource = new ol.source.Vector();
var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#db0202',
        width: 2,
    }),
});

var path = new ol.layer.Vector({
    source: pathSource,
    style: style,
});
map.addLayer(path);

var startPointSource = new ol.source.Vector();
var startPointLayer = new ol.layer.Vector({
    source: startPointSource,
}); 
map.addLayer(startPointLayer);

var destinationPointSource = new ol.source.Vector();
var destinationPointLayer = new ol.layer.Vector({
    source: destinationPointSource,
});  
map.addLayer(destinationPointLayer);


