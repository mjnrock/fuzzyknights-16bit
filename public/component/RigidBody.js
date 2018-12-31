import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";

class RigidBody extends Component {
	constructor(mask) {
		super(EnumComponentType.RIGID_BODY);
		
		//* The "Origin" is a PIXEL offset that will be added to the Entity's Position
		this.CollisionMask = mask;
	}
}

export { RigidBody };