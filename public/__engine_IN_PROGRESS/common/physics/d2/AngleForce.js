import Angle from "./Angle.js";
import { NewUUID } from "./../../../utility/Functions.js";
import ClampedScalar from "../../utility/ClampedScalar";

class AngleForce {
	constructor(mag, dir = 0) {
		this.Magnitude = new ClampedScalar(mag, { min: 0 });
		this.Angle = Angle.Generate(dir, true);

		this.UUID = NewUUID();
	}

	Merge(mag, dir) {
		if(mag instanceof AngleForce) {
			this.Magnitude.Add(mag.Magnitude);
			this.Angle.Theta += mag.Angle.Theta;
		}

		this.Magnitude.Add(mag);
		this.Angle.Theta += dir;

		return this;
	}
	MergeMultiple(...forces) {
		forces.forEach(force => {
			this.Merge(force);
		});

		return this;
	}

	static Generate(mag, dir = 0) {
		return new AngleForce(mag, dir);
	}
}

export default AngleForce;