import EnumEntityType from "../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "../Entity.js";

class Terrain extends Entity {
	constructor(type, nav, meta = null, components = []) {
		super(EnumEntityType.TERRAIN);

		this.Components = [
			new Components.TerrainInfo(type, nav, meta),
			...components
		];
	}
}

export { Terrain };