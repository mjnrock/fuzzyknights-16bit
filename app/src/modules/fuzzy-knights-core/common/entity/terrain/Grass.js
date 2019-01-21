import { Terrain } from "./Terrain.js";
import Components from "./../../component/package.js";

class Grass extends Terrain {
	constructor(components = [], meta = null) {
		super(
			Components.Enum.TerrainType.GRASS,
			Components.Enum.NavigabilityType.GRASS,
			meta,
			components
		);
	}
}

export { Grass };