document.getElementById("searchButton").addEventListener("click", function(){
    var coordinate = document.getElementById("searchCoordinate").value.split(",");
    addPointToMap(searchPointSource, "point", parseFloat(coordinate[0]), parseFloat(coordinate[1]));
    
});

var searchPointSource = new ol.source.Vector();

var searchPointLayer = new ol.layer.Vector({
    source: searchPointSource,
});


    
map.addLayer(searchPointLayer);