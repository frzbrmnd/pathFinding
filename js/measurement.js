var measurementSource = new ol.source.Vector();
var measurementLayer = new ol.layer.Vector({
  source: measurementSource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33',
      }),
    }),
  }),
});
map.addLayer(measurementLayer);

var sketch;

var helpTooltipElement;

var helpTooltip;

var measureTooltipElement;

var measureTooltip;

var continuePolygonMsg = 'Click to continue drawing the polygon';

var continueLineMsg = 'Click to continue drawing the line';
    
//a variable showing type of measurement     
var measurementType = "";

var pointerMoveHandler = function (evt) {
    if (evt.dragging) {
        return;
    }
    if (!measurementType) {
        return;
    }
    var helpMsg = 'Click to start drawing';

    if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
};


map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function () {
    if(measurementType){
        helpTooltipElement.classList.add('hidden');
    }
});

var draw;

var formatLength = function (line) {
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

var formatArea = function (polygon) {
    
    
    var area = ol.sphere.getArea(polygon);
    var output;
    
    
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};



function addInteraction() {
    
    //disableing other features
    mode = "measurement";
    
    
    
    var type = measurementType == 'area' ? 'Polygon' : 'LineString';
    draw = new ol.interaction.Draw({
        source: measurementSource,
        type: type,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)',
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
            }),
        }),
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    draw.on('drawstart', function (evt) {
      
        var measureTooltips = document.getElementsByClassName("ol-tooltip-static");
        for (var i = measureTooltips.length-1; i >= 0; i--) {
            measureTooltips[i].remove();
        }
        measurementSource.clear();
        
        
        // set sketch
        sketch = evt.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);
    });
}


function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.remove();
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.setAttribute("id", "helpTooltipElement");
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
}

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);
}

var measurementItems = document.getElementsByClassName("dropdown-item");

Array.prototype.forEach.call(measurementItems, function(element) {
    element.addEventListener('click', function() {
        map.removeInteraction(draw);
        if(measurementType == element.id){
            measurementType = "";
            helpTooltipElement.remove();
            document.getElementById("selectMeasurementType").classList.remove("selectMeasurementTypeBackground");
            document.getElementById(element.id).classList.remove("selectedDropdownItem");
        }else{
            //map.removeInteraction(draw);
            measurementType = element.id;
            document.getElementById("selectMeasurementTypeImage").src = element.id == "length" ? "./img/distance.jpg" : "./img/area.png";
            addInteraction();
            if (document.getElementsByClassName("selectedDropdownItem").length > 0){
                document.getElementsByClassName("selectedDropdownItem")[0].classList.remove("selectedDropdownItem");
            }      
            document.getElementById("selectMeasurementType").classList.add("selectMeasurementTypeBackground");
            document.getElementById(element.id).classList.add("selectedDropdownItem");
        }
    });    
});

window.addEventListener('click', function() {
    if (event.target == toggleLayerContainer) {
        map.removeInteraction(draw);
        measurementType = "";
        if (typeof(helpTooltipElement) != 'undefined') {
            helpTooltipElement.remove();
        }
        document.getElementById("selectMeasurementType").classList.remove("selectMeasurementTypeBackground");
        if (document.getElementsByClassName("selectedDropdownItem").length > 0){
            document.getElementsByClassName("selectedDropdownItem")[0].classList.remove("selectedDropdownItem");
        }
    }
});