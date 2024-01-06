import mapbox_vector_tile

with open('8132.pbf', 'rb') as f:
    data = f.read()

decoded_data = mapbox_vector_tile.decode(data)

total_batched = 0
for building in decoded_data['building']['features']:
    if building['properties'].get("model3d", "") == "batched":
        total_batched += 1
        print(building['id'])
print(total_batched)