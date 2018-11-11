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

export default TerrainType;