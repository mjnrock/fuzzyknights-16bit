import Angle from "./Angle.js";

class Velocity {
	constructor(x = 0, y = 0, r = 0, isDegrees = true) {
		this.X = x;
		this.Y = y;
		this.Angle = Angle.Generate(r, isDegrees);
	}

	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		return new Velocity(x, y, r, isDegrees);
	}
}

export default Velocity;