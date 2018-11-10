const NavigabilityType = {
	NONE:			1,
	WATER:			2,
	SAND:			3,
	GRASS:			4,
	ROCK:			5,
	PATH:			6
};

NavigabilityType.Lookup = function(value) {
	for(let key in NavigabilityType) {
		if(NavigabilityType[key] === +value) {
			return key;
		}
	}

	return false;
};

export default NavigabilityType;