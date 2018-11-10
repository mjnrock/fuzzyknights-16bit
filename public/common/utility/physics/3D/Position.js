class Position {
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

	GetDistance(pos) {
		return Math.sqrt(
			Math.pow(pos.X - this.X, 2)
			+ Math.pow(pos.Y - this.Y, 2)
			+ Math.pow(pos.Z - this.Z, 2)
		);
	}
}

export { Position };