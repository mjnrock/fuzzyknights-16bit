const NavigabilityType = {
	NONE:			1,
	WATER:			2,
	SAND:			3,
	GRASS:			4,
	ROCK:			5,
	PATH:			6
};

NavigabilityType.GetConstraint = function(value) {
	const Speed = {
		NONE:			0,
		WATER:			0.25,
		SAND:			0.33,
		GRASS:			1,
		ROCK:			0.5,
		PATH:			1.25
	};

	return Speed[NavigabilityType.Lookup(value)];
};

NavigabilityType.Lookup = function(value) {
	for(let key in NavigabilityType) {
		if(NavigabilityType[key] === +value) {
			return key;
		}
	}

	return false;
};

NavigabilityType.ForEach = function(callback, ...args) {
	for(let key in NavigabilityType) {
		if(typeof NavigabilityType[key] === "number") {
			callback(key, NavigabilityType[key], ...args);
		}
	}
};

export default NavigabilityType;