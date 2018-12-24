const StateType = {
	NORMAL:		1
};

StateType.Lookup = function(value) {
	for(let key in StateType) {
		if(StateType[key] === +value) {
			return key;
		}
	}

	return false;
};

StateType.ForEach = function(callback, ...args) {
	for(let key in StateType) {
		if(typeof StateType[key] === "number") {
			callback(key, StateType[key], ...args);
		}
	}
};

StateType.ToArray = () => {
	return Object.values(StateType).filter(v => typeof v !== "function");
};

export default StateType;