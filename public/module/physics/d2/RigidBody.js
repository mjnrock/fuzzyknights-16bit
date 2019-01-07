import Orientation from "./Orientation.js";

class RigidBody {
	constructor(mass = 1.0, x = 0, y = 0, r = 0, isDegrees = true) {
		this.Mass = mass;
		//?	Orientation.Point is assumed to be the "Center of Mass"
		//?	Orientation.Angle is assumed to be the "Facing" θ
		this.Orientation = Orientation.Generate(x, y, r, isDegrees);
	}
}

export default RigidBody;