import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";

class TerrainInfo extends Component {
	constructor(tt, nav, meta) {
		super(EnumComponentType.TERRAIN_INFO);

		this.TerrainType = tt;
		this.Navigability = nav;
		this.Meta = meta;
	}
}

export { TerrainInfo };