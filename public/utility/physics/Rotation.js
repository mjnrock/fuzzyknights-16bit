class Rotation {
	constructor(y = 0, isRadians = true) {
		this.Yaw = y;
		this.IsRadians = isRadians;
	}

	GetValues(numsOnly = false) {
		if(numsOnly) {
			return [
				this.Yaw
			];
		}

		return [
			this.Yaw,
			this.IsRadians
		];
	}

	Set(y) {
		this.Yaw = (y === null || y === void 0) ? this.Yaw : y;

		return this;
	}

	SetRadians() {
		if(!this.IsRadians) {
			this.Yaw = this.Yaw * Math.PI / 180;
		}

		this.IsRadians = true;
	}
	SetDegrees() {
		if(this.IsRadians) {
			this.Yaw = this.Yaw / Math.PI * 180;
		}

		this.IsRadians = false;
	}
}

export { Rotation };