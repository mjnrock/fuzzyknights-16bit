class Rotation {
	constructor(p = 0, y = 0, r = 0, isRadians = true) {
		this.Pitch = p;
		this.Yaw = y;
		this.Roll = r;
		this.IsRadians = isRadians;
	}

	GetValues(numsOnly = false) {
		if(numsOnly) {
			return [
				this.Pitch,
				this.Yaw,
				this.Roll
			];
		}

		return [
			this.Pitch,
			this.Yaw,
			this.Roll,
			this.IsRadians
		];
	}

	Set(p, y, r) {
		this.Pitch = (p === null || p === void 0) ? this.Pitch : p;
		this.Yaw = (y === null || y === void 0) ? this.Yaw : y;
		this.Roll = (r === null || r === void 0) ? this.Roll : r;

		return this;
	}

	SetRadians() {
		if(!this.IsRadians) {
			this.Pitch = this.Pitch * Math.PI / 180;
			this.Yaw = this.Yaw * Math.PI / 180;
			this.Roll = this.Roll * Math.PI / 180;
		}

		this.IsRadians = true;
	}
	SetDegrees() {
		if(this.IsRadians) {
			this.Pitch = this.Pitch / Math.PI * 180;
			this.Yaw = this.Yaw / Math.PI * 180;
			this.Roll = this.Roll / Math.PI * 180;
		}

		this.IsRadians = false;
	}
}

export { Rotation };