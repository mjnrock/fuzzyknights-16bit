class Angle {
	constructor(y = 0, isDegrees = true) {
		this.Theta = y;
		this.IsDegrees = isDegrees === null || isDegrees === void 0 ? true : isDegrees;
	}

	Get(angleOnly = false) {
		if(angleOnly) {
			return this.Theta;
		}

		return [
			this.Theta,
			this.IsDegrees
		];
	}
	Set(theta = null, isDegrees = null) {
		if(theta instanceof Angle) {
			let angle = x;
			this.Theta = angle.Theta;
			this.IsDegrees = angle.IsDegrees;

			return this;
		}

		this.Theta = (theta === null || theta === void 0) ? this.Theta : theta;
		this.IsDegrees = (isDegrees === null || isDegrees === void 0) ? this.IsDegrees : isDegrees;

		return this;
	}
	//#	Merge(Angle)
	//#	Merge(theta, isDegrees = true)
	Merge(input, isDegrees = true) {
		if(typeof input === "number") {
			input = Angle.Generate(input, isDegrees);
		}
		this.ActivateDegrees();
		input.ActivateDegrees();

		this.Theta += input.Theta;

		return this;
	}

	//#	CalcMergeAngle(Angle)
	//#	CalcMergeAngle(theta, isDegrees = true)
	CalcNewAngle(input, isDegrees = true) {
		if(typeof input === "number") {
			input = Angle.Generate(input, isDegrees);
		} else {
			input = input;
		}

		if(this.IsDegrees) {
			input.ActivateDegrees();
		} else {
			input.ActivateRadians();
		}

		return Angle.Generate(
			input.Theta + this.Theta,
			input.IsDegrees
		);
	}

	/**
	 * Normalizes the angle to a maximum of 1 rotation (i.e. Modulus of 360 or 2π)
	 */
	Unitize() {
		if(this.IsDegrees) {
			this.Theta = this.Theta % 360;
		} else {
			this.Theta = this.Theta % (2 * Math.PI);
		}

		return this;
	}

	ActivateRadians() {
		if(this.IsDegrees) {
			this.Theta = this.Theta * Math.PI / 180;
		}

		this.IsDegrees = false;

		return this;
	}
	ActivateDegrees() {
		if(!this.IsDegrees) {
			this.Theta = this.Theta / Math.PI * 180;
		}

		this.IsDegrees = true;

		return this;
	}

	Copy() {
		return this.CalcNewAngle(this.Theta, this.IsDegrees);
	}
	static Generate(theta = 0, isDegrees = true) {
		return new Angle(theta, isDegrees);
	}
}

export default Angle;