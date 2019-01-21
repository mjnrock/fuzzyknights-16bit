import { Terrain } from "/engine/common/entity/terrain/Terrain.js";

import Components from "./../../component/package.js";

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