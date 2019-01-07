import Angle from "./Angle.js";

class Force {
	constructor(x = 0, y = 0, r = 0, isDegrees = true) {
		this.X = x;
		this.Y = y;
		this.Angle = Angle.Generate(r, isDegrees);
	}

	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		return new Force(x, y, r, isDegrees);
	}
}

export default Force;