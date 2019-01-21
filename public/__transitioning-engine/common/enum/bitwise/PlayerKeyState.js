const PlayerKeyState = {
	IDLE:		1 << 0,
	LEFT:		1 << 1,
	RIGHT:		1 << 2,
	UP:			1 << 3,
	DOWN:		1 << 4
};

PlayerKeyState.ForEach = function(callback, ignoreFlags = [], ...args) {
	if(typeof ignoreFlags === "number") {
		ignoreFlags = [
			ignoreFlags
		];
	}
	
	for(let key in PlayerKeyState) {
		if(typeof PlayerKeyState[key] === "number" && !ignoreFlags.includes(PlayerKeyState[key])) {
			callback(key, PlayerKeyState[key], ignoreFlags, ...args);
		}
	}
};

export default PlayerKeyState;