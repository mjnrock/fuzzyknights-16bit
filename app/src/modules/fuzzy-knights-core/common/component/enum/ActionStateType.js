const ActionStateType = {
	IDLE:		1 << 1,
	MOVEMENT:	1 << 2,
	ACTION:		1 << 3,
	ATTACK:		1 << 4,
	DEFEND:		1 << 5,
	DYING:		1 << 6,
	DEAD:		1 << 7
};

ActionStateType.Lookup = function(value) {
	for(let key in ActionStateType) {
		if(ActionStateType[key] === +value) {
			return key;
		}
	}

	return false;
};

ActionStateType.ForEach = function(callback, ...args) {
	for(let key in ActionStateType) {
		if(typeof ActionStateType[key] === "number") {
			callback(key, ActionStateType[key], ...args);
		}
	}
};

ActionStateType.ToArray = () => {
	return Object.values(ActionStateType).filter(v => typeof v !== "function");
};

export default ActionStateType;