import Angle from "./Angle.js";
import { NewUUID } from "./../../../utility/Functions.js";

class Force {
	constructor(x = 0, y = 0, r = 0, isDegrees = true) {
		this.X = x;
		this.Y = y;
		this.Angle = Angle.Generate(r, isDegrees);

		this.UUID = NewUUID();
	}
	
	Get() {
		return [
			this.X,
			this.Y,
			...this.Angle.Get()
		];
	}

	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		return new Force(x, y, r, isDegrees);
	}
}

export default Force;