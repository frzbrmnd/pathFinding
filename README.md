This project is a web-based path-finding tool that computes optimal routes across a raster landscape. It integrates geospatial datasets, a cost surface, and a Python-based routing algorithm to generate realistic paths for walking or movement analysis.

# Key Features

- Raster-Based Path Finding
Uses a cost surface derived from terrain slope, where steeper areas are assigned higher travel costs. The cost layer was generated in QGIS by computing slope from a DEM. Non-walkable landuse types such as water bodies, rivers, and other restricted areas were masked out to ensure the routing algorithm only considers valid terrain.

- Python Routing Algorithm
Implements path finding with the skimage.graph library, executed via CGI and AJAX for real-time results.

- MapServer Integration
Displays raster layers, roads, rivers, and landuse using MapServer as the backend mapping engine.

- Interactive Web Map
Built with OpenLayers, offering tools for measurement, coordinate display, layer visualization, and user interaction.

# Technologies Used

- Python (pathfinding logic)

- CGI + AJAX

- MapServer

- OpenLayers

- Raster and vector geospatial datasets
