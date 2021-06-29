document.getElementById("clearMap").addEventListener("click", function(){
    startPointSource.clear();
    destinationPointSource.clear();
    pathSource.clear();
    searchPointSource.clear();
    measurementSource.clear();
    var measureTooltips = document.getElementsByClassName("ol-tooltip-static");
    for (var i = measureTooltips.length-1; i >= 0; i--) {
        measureTooltips[i].remove();
    }
});
