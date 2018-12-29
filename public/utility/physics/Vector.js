class Vector {
	constructor(x = 0, y = 0) {
		this.X = x;
		this.Y = y;
	}

	GetValues() {
		return [
			this.X,
			this.Y
		];
	}

	Set(x, y) {
		this.X = (x === null || x === void 0) ? this.X : x;
		this.Y = (y === null || y === void 0) ? this.Y : y;

		return this;
	}
}

export default Vector;