import EnumComponentType from "./enum/ComponentType.js";
import { Velocity } from "./../utility/physics/2D/Velocity.js";
import { Vector } from "./../utility/physics/2D/Vector.js";
import { Rotation } from "./../utility/physics/2D/Rotation.js";

import { Component } from "./Component.js";
import { Map } from "./element/Map.js";

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