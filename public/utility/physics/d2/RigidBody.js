import Point from "./Point.js";

class RigidBody {
	constructor(m, x = 0, y = 0, { acceleration = null, velocity = null, displacement = null}) {
		this.Mass = m;
		this.Point = Point.Generate(x , y);
	}
}

export default RigidBody;