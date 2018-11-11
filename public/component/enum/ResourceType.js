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

export default ResourceType;