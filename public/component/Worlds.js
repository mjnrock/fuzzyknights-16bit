import { Component } from "./Component.js";

import EnumComponentType from "./enum/ComponentType.js";
import Orientation from "./../module/physics/d2/Orientation.js";
import Kinetics from "./../module/physics/d2/Kinetics.js";

class Worlds extends Component {
	constructor(dimUUID, zoneUUID, x, y) {
		super(EnumComponentType.WORLDS);
		
		this.Identifiers = {
			Dimension: dimUUID,
			Zone: zoneUUID
		};
		this.Heading = Orientation.Generate(x, y, 0);
		this.Kinetics = new Kinetics();
	}
}

export { Worlds };