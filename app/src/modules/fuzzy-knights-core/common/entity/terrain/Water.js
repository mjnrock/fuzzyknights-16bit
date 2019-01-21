import { Terrain } from "./Terrain.js";
import Components from "./../../component/package.js";

class Water extends Terrain {
	constructor(components = [], meta = null) {
		super(
			Components.Enum.TerrainType.WATER,
			Components.Enum.NavigabilityType.WATER,
			meta,
			components
		);
	}
}

export { Water };