import { Component } from "/engine/common/component/Component.js";

import EnumComponentType from "./enum/ComponentType.js";

class Worlds extends Component {
	constructor(x, y, zoneUUID, dimUUID) {
		super(EnumComponentType.WORLDS);
		
		this.Identifiers = {
			Dimension: dimUUID,
			Zone: zoneUUID
		};
		// this.Heading = Orientation.Generate(x, y, 0);
		this.Heading = {
			X: x,
			Y: y,
			Theta: 0
		};
	}
}

export { Worlds };