import GridMap from "./../utility/GridMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Zone {
	constructor(width, height) {
		this.Terrain = new GridMap(width, height);
		this.Entities = [];

		this.UUID = NewUUID();
	}

	//? @protagonist is a Player's Entity
	Tick(time, protagonist) {
		// let pos = Zone.FuzzyKnights.Component.Mutator.Worlds.GetPosition(protagonist);

		//TODO ALl the map .TICK() stuff
	}
}

export { Zone };