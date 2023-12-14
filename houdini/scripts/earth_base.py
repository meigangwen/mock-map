# This code is called when instances of this SOP cook.
node = hou.pwd()
geo = node.geometry()

# Add code to modify the contents of geo.

filepath = hou.pwd().parm('file').eval()
textFile = hou.readFile(filepath)

countryList = textFile.split("|")
countryList = list(filter(None, countryList))
countryList = [c.strip() for c in countryList]
countryList = countryList[1:]

# Add 2 attributes lat and lon
geo.addAttrib(hou.attribType.Point, "lat", 0)
geo.addAttrib(hou.attribType.Point, "lon", 0)

for country in countryList:
    countryInfo = country.split("$")
    countryInfo = list(filter(None, countryInfo))

    # Get the country and continent names
    countryName = countryInfo[0]
    countryName = ''.join(e for e in countryName if e.isalnum())  # trim all white spaces, illegal characters
    continentName = countryInfo[1]
    continentName = ''.join(e for e in continentName if e.isalnum())  # trim all white spaces, illegal characters

    # create a point group for every country
    if geo.findPointGroup(countryName) == None:
        countryPtsGroup = geo.createPointGroup(countryName)

    """    
    #create a point group for every continent
    if geo.findPointGroup(continentName) == None:
        continentPtsGroup = geo.createPointGroup(continentName)
    """
    regions = countryInfo[2].split("*")
    regions = list(filter(None, regions))

    for region in regions:
        borderCoords = region.split(";")
        borderCoords = list(filter(None, borderCoords))

        poly = geo.createPolygon()

        for borderCoord in borderCoords:
            latlon = borderCoord.split(",")
            lat = float(latlon[0])
            lon = float(latlon[1])

            point = geo.createPoint()
            point.setPosition((lat, lon, 0))
            poly.addVertex(point)

            # set newly added point to country group
            countryPtsGroup = geo.findPointGroup(countryName)
            countryPtsGroup.add(point)
            """
            continentPtsGroup = geo.findPointGroup(continentName)
            continentPtsGroup.add(point)
            """
        # Check if need to set polygon closed to False
        if node.parm('IsClosed').eval() == False:
            poly.setIsClosed(False)