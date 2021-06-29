/*var panelStatus = "on";
document.getElementById("togglePanel").onclick = function(){
    
    if(panelStatus === "on"){
        document.getElementById("panel").style.marginLeft = "-25%";
        panelStatus = "off";
    }else{
        document.getElementById("panel").style.marginLeft = "0";
        panelStatus = "on";
    }
};
*/

function switchLayers(){
    var layers = "earth";
    if(document.getElementById("myLanduse").checked){
        layers += ",landuse";
    }
    if(document.getElementById("myRivers").checked){
        layers += ",rivers";
    }
    if(document.getElementById("myRoutes").checked){
        layers += ",roads";
    }
    mainSource.updateParams({'LAYERS': layers});
};

var layers = document.getElementsByClassName("layer");
var toggleLayerContainer = document.getElementById("toggleLayers");

toggleLayerContainer.onclick = function(){
    toggleLayerContainer.classList.remove("closeToggleLayers");
    toggleLayerContainer.classList.add("openToggleLayers");
    setTimeout(function(){
        for (var i=0; i<layers.length; i++){
            layers[i].style.display="block";
        }
    }, 300);
    
}

window.addEventListener('click', function() {
    if (event.target != toggleLayerContainer & !event.target.classList.contains("layer")) {
        var layers = document.getElementsByClassName("layer");
        for (var i=0; i<layers.length; i++){
            layers[i].style.display="none";
        }
        document.getElementById("toggleLayers").classList.remove("openToggleLayers");
        document.getElementById("toggleLayers").classList.add("closeToggleLayers"); 
    }    
});

