import { Position } from "./Position.js";
import { Rotation } from "./Rotation.js";

class Velocity {
	/**
	 * @param Vector vector 
	 * @param Rotation rotation 
	 */
	constructor(vector, rotation) {
		this.Vector = vector;
		this.Rotation = rotation;
	}

	GetValues() {
		return [
			...this.Vector.GetValues(),
			...this.Rotation.GetValues()
		];
	}

	/**
	 * @param Position origin
	 * @param int ms Milliseconds to elapse (DEFAULT = 1000, 1s)
	 */
	CalcPosition(origin, ms = 1000) {
		return new Position(
			origin.X + (this.Vector.X * ms / 1000),
			origin.Y + (this.Vector.Y * ms / 1000)
		);
	}

	/**
	 * @param Rotation orientation
	 * @param int ms Milliseconds to elapse (DEFAULT = 1000, 1s)
	 */
	CalcRotation(orientation, ms = 1000) {
		if(this.Rotation.IsRadians) {
			orientation.SetRadians();
		} else {
			orientation.SetDegrees();
		}

		return new Rotation(
			orientation.Yaw + (this.Rotation.Yaw * ms / 1000),
			orientation.IsRadians
		);
	}
}

export { Velocity };