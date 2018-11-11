import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";

class TerrainInfo extends Component {
	constructor(type, nav, meta) {
		super(EnumComponentType.TERRAIN_INFO);

		this.Type = type;
		this.Navigability = nav;
		this.Meta = meta;
	}
}

export { TerrainInfo };