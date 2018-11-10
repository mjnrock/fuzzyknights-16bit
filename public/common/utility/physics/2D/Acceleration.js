import { Position } from "./Position.js";
import { Rotation } from "./Rotation.js";

class Acceleration {
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
			origin.X + (this.Vector.X * 0.5 * Math.pow(ms / 1000, 2)),
			origin.Y + (this.Vector.Y * 0.5 * Math.pow(ms / 1000, 2))
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
			orientation.Pitch + (this.Rotation.Pitch * 0.5 * Math.pow(ms / 1000, 2)),
			orientation.Yaw + (this.Rotation.Yaw * 0.5 * Math.pow(ms / 1000, 2)),
			orientation.IsRadians
		);
	}
}

export { Acceleration };