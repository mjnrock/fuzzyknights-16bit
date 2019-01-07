import GridMap from "./../utility/GridMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Zone {
	constructor(width, height) {
		this.Terrain = new GridMap(width, height);
		this.Entities = [];

		this.UUID = NewUUID();
	}

	Tick(time) {
		//TODO ALl the map .TICK() stuff
	}
}

export { Zone };