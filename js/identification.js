document.getElementById("identify").addEventListener('click', function() {
    if (mode != "identify"){
        mode = "identify";
        document.getElementById("identify").classList.add("selectedMode");
    }else{
        mode = "";
        document.getElementById('informationContainer').style.display = "none";
        document.getElementById("identify").classList.remove("selectedMode");
    }
});


//var resolution = map.getView().getResolution();
//updateLegend(resolution);



map.on('singleclick', function (evt) {
    document.getElementById('earth').innerText = "";
    document.getElementById('landuse').innerText = "";
    document.getElementById('rivers').innerText = "";
    document.getElementById('roads').innerText = "";
    if (mode == "identify"){
        var viewResolution = view.getResolution();  
        var url = mainSource.getFeatureInfoUrl(
          evt.coordinate,
          viewResolution,
          'EPSG:4326',
          {'INFO_FORMAT': 'text/plain'}
        );
        if (url) {
            fetch(url)
                .then(function (response) { return response.text(); })
                .then(function (html) {
                    document.getElementById('informationContainer').style.display = "flex";
                    //document.getElementById("earth").innerText = "Layer name: ";
                    var layersInfo = html.split("Layer '");
                    for (layer of layersInfo){
                        if (layer.startsWith("earth")){
                            var x = layer.split("\n")[2]
                            x = x.slice(9, x.length-1);
                            var y = layer.split("\n")[3];
                            y = y.slice(9, y.length-1);
                            document.getElementById('earth').innerText = x + ", " + y;
                        }else if (layer.startsWith("landuse")){
                            var landuse = layer.split("\n")[4];
                            landuse = landuse.slice(16,landuse.length-1);
                            document.getElementById('landuse').innerText = landuse;
                        }else if (layer.startsWith("rivers")){
                            var riverName = layer.split("\n")[3];
                            riverName = riverName.slice(12, riverName.length-1);
                            document.getElementById('rivers').innerText = riverName;
                        }else if (layer.startsWith("roads")){
                            var roadInformation = layer.split("\n");
                            var roadName = roadInformation[3];
                            roadName = roadName.slice(12, roadName.length-1);
                            if (roadName.length == 0){
                                roadName = "undefined";
                            }
                            var roadType = roadInformation[15];
                            roadType = roadType.slice(17, roadType.length-1);
                            document.getElementById('roads').innerText = "(" + roadType + ") " + roadName;
                        }
                    }        
            });
        }
    }else{
        document.getElementById('informationContainer').style.display = "none";
        document.getElementById("identify").classList.remove("selectedMode");
    }
});

document.getElementById("closeInformationContainer").addEventListener('click', function() {
    document.getElementById('informationContainer').style.display = "none";
    document.getElementById("identify").classList.remove("selectedMode");
    mode = "";
});


