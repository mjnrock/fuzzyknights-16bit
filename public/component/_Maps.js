import EnumComponentType from "./enum/ComponentType.js";
import Velocity from "../utility/_physics/Velocity.js";
import Vector from "../utility/_physics/Vector.js";
import Rotation from "../utility/_physics/Rotation.js";

import { Component } from "./Component.js";
import { Map } from "./element/_Map.js";

class Maps extends Component {
	/**
	 * @param [[EnumMapType, X, Y, MapUUID], ...] maps : [Modifiers] parameter is optional
	 */
	constructor(type, x, y, uuid) {
		super(EnumComponentType.MAPS);

		this.Velocity = new Velocity(new Vector(0, 0), new Rotation(0));
		this.ActiveMap = new Map(type, x, y, uuid);
	}
}

export { Maps };