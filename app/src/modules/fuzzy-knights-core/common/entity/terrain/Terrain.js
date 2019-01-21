import EnumEntityType from "engine/common/enum/bitwise/EntityType.js";
import { Entity } from "engine/common/entity/Entity.js";

import Components from "./../../component/package.js";

class Terrain extends Entity {
	constructor(type, nav, meta = null, components = []) {
		super(EnumEntityType.TERRAIN, components);

		this.Components.push(
			new Components.TerrainInfo(type, nav, meta)
		);
	}
}

export { Terrain };