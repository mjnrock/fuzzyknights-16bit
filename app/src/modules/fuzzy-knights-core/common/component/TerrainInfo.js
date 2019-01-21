import { Component } from "engine/common/component/Component.js";

import EnumComponentType from "./enum/ComponentType.js";

class TerrainInfo extends Component {
	constructor(tt, nav, meta = 0) {
		super(EnumComponentType.TERRAIN_INFO);

		this.TerrainType = tt;
		this.Navigability = nav;
		this.Meta = meta;
	}
}

export { TerrainInfo };