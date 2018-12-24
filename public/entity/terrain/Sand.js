import Components from "../../component/package.js";
import { Terrain } from "./Terrain.js";

class Sand extends Terrain {
	constructor(components = [], meta = null) {
		super(
			Components.Enum.TerrainType.SAND,
			Components.Enum.NavigabilityType.SAND,
			meta,
			components
		);
	}
}

export { Sand };