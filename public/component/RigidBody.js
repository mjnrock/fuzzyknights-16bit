import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";

class RigidBody extends Component {
	constructor(mask) {
		super(EnumComponentType.RIGID_BODY);
		
		//* The "Origin" is a percentage offset from [0-1.0] for both X and Y.
		this.CollisionMask = mask;
	}
}

export { RigidBody };