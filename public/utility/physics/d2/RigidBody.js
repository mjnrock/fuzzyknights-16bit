import Orientation from "./Orientation";

class RigidBody {
	constructor(mass = 1.0, x = 0, y = 0, r = 0, isDegrees = true) {
		this.Mass = mass;
		this.Orientation = Orientation.Generate(x, y, r, isDegrees);
	}
}

export default RigidBody;