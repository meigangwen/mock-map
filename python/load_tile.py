import mapbox_vector_tile

with open('14_12914_8132.pbf', 'rb') as f:
    data = f.read()

decoded_data = mapbox_vector_tile.decode(data)
print(decoded_data)