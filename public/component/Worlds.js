import { Component } from "./Component.js";

import EnumComponentType from "./enum/ComponentType.js";
import Orientation from "./../physics/d2/Orientation.js";

class Worlds extends Component {
	constructor(x, y, zoneUUID, dimUUID) {
		super(EnumComponentType.WORLDS);
		
		this.Identifiers = {
			Dimension: dimUUID,
			Zone: zoneUUID
		};
		this.Heading = Orientation.Generate(x, y, 0);
	}
}

export { Worlds };