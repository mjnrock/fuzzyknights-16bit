const ResourceType = {
	HEALTH:		1,
	MANA:		2
};

ResourceType.Lookup = function(value) {
	for(let key in ResourceType) {
		if(ResourceType[key] === +value) {
			return key;
		}
	}

	return false;
};

ResourceType.ForEach = function(callback, ...args) {
	for(let key in ResourceType) {
		if(typeof ResourceType[key] === "number") {
			callback(key, ResourceType[key], ...args);
		}
	}
};

export default ResourceType;