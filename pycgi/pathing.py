#!/home/frzbrmnd/anaconda3/bin/python
# -*- coding: UTF-8 -*-

print("Content-Type: text/plain")
print()


import numpy as np
import rasterio
from skimage.graph import route_through_array

import cgi, cgitb
cgitb.enable()

import json


form = cgi.FieldStorage()
data = {key: form.getvalue(key) for key in form.keys()}



def compute_least_cost_path(raster_path, start_xy, end_xy):
    

    # Read raster
    with rasterio.open(raster_path) as src:
        cost_array = src.read(1)
        transform = src.transform

        # Map coords -> pixel coords
        start_row, start_col = ~transform * start_xy
        end_row, end_col = ~transform * end_xy

    start = (int(start_row), int(start_col))
    end = (int(end_row), int(end_col))

    # Ensure costs are positive
    cost_array = np.where(np.isnan(cost_array), np.inf, cost_array)

    # Compute least-cost path
    indices, total_cost = route_through_array(
        cost_array,
        start,
        end,
        fully_connected = True,
        geometric = True
    )

    indices = np.array(indices)

    # Convert pixel coords back to map coords
    path_coords = [
        transform * (row, col)
        for row, col in indices
    ]

    return path_coords, total_cost

raster = "../data/cost.tif"
start_point = (float(data["startLng"]), float(data["startLat"]))
end_point = (float(data["destinationLng"]), float(data["destinationLat"]))

path, cost = compute_least_cost_path(raster, start_point, end_point)


geojson = {
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": path
    },
    "properties": {}
}

print(json.dumps(geojson))









