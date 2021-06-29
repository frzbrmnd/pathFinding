<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Path Finding</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <script src="./js/ol.js"></script>
        <link rel="shortcut icon" href="#"> <!--for netbeans favicon error-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link rel="stylesheet" href="./css/myStyle.css">
    </head>
    <body>    
        <div id="map" class="map"></div>
        <!--                for legend if necessary    
        <img id="legend1">
        <img id="legend2">
        <img id="legend3">
        -->
        <!-- checkbox for turn layers on and off -->
        <div id="toggleLayers" class="row justify-content-center align-items-center closeToggleLayers">
            <input type="checkbox" id="myRivers" class="col-4 layer" onclick="switchLayers()" name="layer" value="rivers">
            <input type="checkbox" id="myRoutes" class="col-4 layer" onclick="switchLayers()" name="layer" value="roads">
            <input type="checkbox" id="myLanduse" class="col-4 layer" onclick="switchLayers()" name="layer" value="landuse">
        </div>
        <!-- measurement tools -->
        <div id="measurementDropDown" class="btn-group dropstart">
            <button id="selectMeasurementType" type="button" class="btn btn-secondary dropdown-toggle customControlButtons" data-bs-toggle="dropdown" aria-expanded="false">
                <img id="selectMeasurementTypeImage" src="./img/distance.jpg">
            </button>
            <ul id="measurementTypes" class="dropdown-menu">
                <li id="length" class="dropdown-item">
                    <img id="lengthImage" src="./img/distance.jpg">
                </li>
                <li id="area" class="dropdown-item">
                    <img id="areaImage" src="./img/area.png">
                </li>
            </ul>
        </div>
        <!-- a panel for searching a coordinate and routing between two points  -->
        <div id="routingPanel" class="container">
            <div id="searchBox" class="row justify-content-center align-items-center">
                <input id="searchCoordinate" type="text" name="searchCoordinate" placeholder="Longitude, Latitude" class="col-10" onfocus="this.placeholder=''" onblur="this.placeholder='Longitude, Latitude'">
                <button id="searchButton" class="col-2"><img src="./img/search.png" style="width: 24px; height: 24px;"></button>
            </div>
            <hr>
            <div id="startRow" class="row align-items-center justify-content-evenly">
                <div class="col-1 pointIcon"><img src="./img/start.png"></div>
                <input class="col-7" id="start" name="start" type="text" placeholder="Longitude, Latitude" onfocus="this.placeholder=''" onblur="this.placeholder='Longitude, Latitude'">
                <div id="selectStart" class="btn btn-primary col-3 selectPoint">Choose</div>
            </div>
            <div id="destinationRow" class="row align-items-center justify-content-evenly">
                <div class="col-1 pointIcon"><img src="./img/destination.png"></div>
                <input class="col-7" id="destination" name="destination" type="text" placeholder="Longitude, Latitude" onfocus="this.placeholder=''" onblur="this.placeholder='Longitude, Latitude'">
                <div id="selectDestination" class="btn btn-primary col-3 selectPoint">Choose</div>
            </div>
            <div class="row justify-content-center align-items-center">
                <button id="startRouting" class="btn btn-primary col-5">start routing</button>
            </div>
        </div>
        <!-- display coordinate of cursor  -->
        <div id="coordinateContainer" ><p id="coordinate"></p></div>
        <!-- display features at clicked point  -->
        <div id="identify" class="btn btn-secondary customControlButtons">
            <img src = "./img/identify.png" width="17px" height="17px"/>            
        </div>
        <div id="informationContainer">
            <p class="information">Feature at: <span id="earth"></span><span id="closeInformationContainer" class="close">X</span></p>
            <p class="information">Landuse: <span id="landuse"></span></p>
            <p class="information">River: <span id="rivers"></span></p>
            <p class="information">Road: <span id="roads"></span></p>
        </div>
        <!-- clear map  -->
        <div id="clearMap" class="btn btn-secondary customControlButtons">
            <img src = "./img/clear.png" width="17px" height="17px"/>            
        </div>        
        <script src="./js/globals.js"></script>
        <script src="./js/createMap.js"></script>
        <script src="./js/layers.js"></script>
        <script src="./js/measurement.js"></script>
        <script src="./js/routing.js"></script>
        <script src="./js/identification.js"></script>
        <script src="./js/search.js"></script>
        <script src="./js/clearMap.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    </body>
</html>