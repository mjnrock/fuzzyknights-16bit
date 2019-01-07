const MapType = {
	TILE:			1,
	TERRAIN:		2,
	BIOME:			3
};

MapType.Lookup = function(value) {
	for(let key in MapType) {
		if(MapType[key] === +value) {
			return key;
		}
	}

	return false;
};

MapType.ForEach = function(callback, ...args) {
	for(let key in MapType) {
		if(typeof MapType[key] === "number") {
			callback(key, MapType[key], ...args);
		}
	}
};

export default MapType;