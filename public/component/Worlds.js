import { Component } from "./Component.js";

import EnumComponentType from "./enum/ComponentType.js";
import Heading from "./../utility/physics/Heading.js";

class Worlds extends Component {
	constructor(dimUUID, zoneUUID, x, y) {
		super(EnumComponentType.WORLDS);
		
		this.Identifiers = {
			Dimension: dimUUID,
			Zone: zoneUUID
		};
		this.Heading = Heading.Generate(x, y, 0);
	}
}

export { Worlds };