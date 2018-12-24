class Rotation {
	constructor(y = 0, isDegrees = true) {
		this.Yaw = y;
		this.isDegrees = isDegrees;
	}

	GetValues(numsOnly = false) {
		if(numsOnly) {
			return [
				this.Yaw
			];
		}

		return [
			this.Yaw,
			this.isDegrees
		];
	}

	Unitize() {
		if(this.isDegrees) {
			this.Yaw = this.Yaw % (2 * Math.PI);
		} else {
			this.Yaw = this.Yaw % 360;
		}

		return this;
	}

	Set(y) {
		this.Yaw = (y === null || y === void 0) ? this.Yaw : y;

		return this;
	}

	SetRadians() {
		if(!this.isDegrees) {
			this.Yaw = this.Yaw * Math.PI / 180;
		}

		this.isDegrees = false;
	}
	SetDegrees() {
		if(this.isDegrees) {
			this.Yaw = this.Yaw / Math.PI * 180;
		}

		this.isDegrees = true;
	}

	static Generate(y = 0, isDegrees = true) {
		return new Rotation(y, isDegrees);
	}
}

export { Rotation };