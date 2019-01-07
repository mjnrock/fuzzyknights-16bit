import Rotation from "./Rotation.js";
import Vector from "./Vector.js";

class Force {
	constructor(magnitude, degrees) {
		this.Magnitude = magnitude;
		this.Direction = Rotation.Generate(degrees, true);
	}

	GetValues() {
		return [
			this.Magnitude,
			this.Direction
		];
	}

	CalcVector() {
		this.Direction.SetRadians();
		let vector = Vector.Generate(
			this.Magnitude * Math.cos(this.Direction.Yaw),
			this.Magnitude * Math.sin(this.Direction.Yaw)
		);
		this.Direction.SetDegrees();

		return vector;
	}

	static Generate(magnitude, degrees) {
		return new Force(magnitude, Rotation.Generate(degrees));
	}
}

export default Force;