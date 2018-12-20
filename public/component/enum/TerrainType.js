const TerrainType = {
	GRASS:		1,
	WATER:		2
};

TerrainType.Lookup = function(value) {
	for(let key in TerrainType) {
		if(TerrainType[key] === +value) {
			return key;
		}
	}

	return false;
};

TerrainType.ForEach = function(callback, ...args) {
	for(let key in TerrainType) {
		if(typeof TerrainType[key] === "number") {
			callback(key, TerrainType[key], ...args);
		}
	}
};

export default TerrainType;