const CreatureType = {
	PASSIVE:	1,
	HOSTILE:	2,
	FRIENDLY:	3
};

CreatureType.Lookup = function(value) {
	for(let key in CreatureType) {
		if(CreatureType[key] === +value) {
			return key;
		}
	}

	return false;
};

CreatureType.ForEach = function(callback, ...args) {
	for(let key in CreatureType) {
		if(typeof CreatureType[key] === "number") {
			callback(key, CreatureType[key], ...args);
		}
	}
};

export default CreatureType;