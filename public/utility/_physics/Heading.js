import Position from "./Position.js";
import Rotation from "./Rotation.js";

class Heading {
	/**
	 * @param Position position 
	 * @param Rotation rotation 
	 */
	constructor(position, rotation) {
		this.Position = position;
		this.Rotation = rotation;
	}

	GetValues() {
		return [
			...this.Position.GetValues(),
			...this.Rotation.GetValues()
		];
	}

	/**
	 * @param Position origin
	 */
	CalcPosition(origin) {
		return new Position(
			origin.X + this.Position.X,
			origin.Y + this.Position.Y
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
			orientation.Yaw + this.Rotation.Yaw,
			orientation.IsRadians
		);
	}

	static Generate(x = 0, y = 0, r = 0) {
		if(x instanceof Position && y instanceof Rotation) {
			return new Heading(x, y);
		} else if(x instanceof Position) {
			return new Heading(x, new Rotation());
		}

		return new Heading(new Position(x, y), new Rotation(r));
	}
}

export default Heading;