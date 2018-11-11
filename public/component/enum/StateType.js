const StateType = {
	ACTION:			1,
	MOVEMENT:		2
};

StateType.Lookup = function(value) {
	for(let key in StateType) {
		if(StateType[key] === +value) {
			return key;
		}
	}

	return false;
};

StateType.ToArray = () => {
	return Object.values(StateType).filter(v => typeof v !== "function");
};

export default StateType;