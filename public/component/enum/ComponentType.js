const ComponentType = {
	RIGID_BODY:			1,
	COMPOUND_ENTITY:	2,

	RESOURCES:			10,
	ATTRIBUTES:			11,
	MAPS:				12,
	STATES:				13,
	TERRAIN_INFO:		14,
	CREATURE_INFO:		15,
	WORLDS:				16
};

ComponentType.Lookup = function(value) {
	for(let key in ComponentType) {
		if(ComponentType[key] === +value) {
			return key;
		}
	}

	return false;
};

ComponentType.ForEach = function(callback, ...args) {
	for(let key in ComponentType) {
		if(typeof ComponentType[key] === "number") {
			callback(key, ComponentType[key], ...args);
		}
	}
};

export default ComponentType;