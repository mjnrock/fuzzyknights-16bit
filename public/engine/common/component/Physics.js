import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";
import Kinetics from "./../physics/d2/Kinetics.js";

class Physics extends Component {
	constructor(mask, mass = 1.00) {
		super(EnumComponentType.PHYSICS);
		
		//* The "Origin" is a PIXEL offset that will be added to the Entity's Position
		this.CollisionMask = mask;
		this.Kinetics = new Kinetics(mass);
	}
}

export { Physics };