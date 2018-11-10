import { Position } from "./Position.js";
import { Rotation } from "./Rotation.js";

class Displacement {
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
	 */
	CalcPosition(origin) {
		return new Position(
			origin.X + this.Vector.X,
			origin.Y + this.Vector.Y,
			origin.Z + this.Vector.Z
		);
	}

	/**
	 * @param Rotation orientation
	 */
	CalcRotation(orientation) {
		if(this.Rotation.IsRadians) {
			orientation.SetRadians();
		} else {
			orientation.SetDegrees();
		}

		return new Rotation(
			orientation.Pitch + this.Rotation.Pitch,
			orientation.Yaw + this.Rotation.Yaw,
			orientation.Roll + this.Rotation.Roll,
			orientation.IsRadians
		);
	}
}

export { Displacement };