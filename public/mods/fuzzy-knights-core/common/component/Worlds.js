import { Component } from "/engine/common/component/Component.js";
import EnumComponentType from "/engine/common/component/enum/ComponentType.js";
import Orientation from "/engine/common/physics/d2/Orientation.js";

class Worlds extends Component {
	constructor(x, y, zoneUUID, dimUUID) {
		super(EnumComponentType.WORLDS);
		
		this.Identifiers = {
			Dimension: dimUUID,
			Zone: zoneUUID,
			Cats: 1
		};
		this.Heading = Orientation.Generate(x, y, 0);
	}
}

export { Worlds };