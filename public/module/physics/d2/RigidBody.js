import Point from "./Point.js";

class RigidBody {
	constructor(mass = 1.0, x = 0, y = 0) {
		this.Mass = mass;
		this.CenterOfMass = Point.Generate(x, y);
	}
}

export default RigidBody;