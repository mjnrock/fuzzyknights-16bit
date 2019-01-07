import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";
import Acceleration from "./../utility/_physics/Acceleration.js";
import Velocity from "./../utility/_physics/Velocity.js";

class RigidBody extends Component {
	constructor(mask) {
		super(EnumComponentType.RIGID_BODY);
		
		//* The "Origin" is a PIXEL offset that will be added to the Entity's Position
		this.CollisionMask = mask;

		this.Mass = 1.00;
		this.Acceleration = new Acceleration();
		this.Velocity = new Velocity();
	}
}

export { RigidBody };