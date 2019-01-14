const NavigabilityType = {
	NONE:			1,
	WATER:			2,
	SAND:			3,
	GRASS:			4,
	ROCK:			5,
	PATH:			6
};

//	These are the Force Physics drivers for friction
const Attenuators = {
	NONE:			0,
	WATER:			3,
	SAND:			5 / 3,
	GRASS:			1,
	ROCK:			2,
	PATH:			5 / 4
};

NavigabilityType.GetConstraint = function(value) {
	return Attenuators[NavigabilityType.Lookup(value)];
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