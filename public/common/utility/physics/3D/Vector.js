class Vector {
	constructor(x = 0, y = 0, z = 0) {
		this.X = x;
		this.Y = y;
		this.Z = z;
	}

	GetValues() {
		return [
			this.X,
			this.Y,
			this.Z
		];
	}

	Set(x, y, z) {
		this.X = (x === null || x === void 0) ? this.X : x;
		this.Y = (y === null || y === void 0) ? this.Y : y;
		this.Z = (z === null || z === void 0) ? this.Z : z;

		return this;
	}
}

export { Vector };