class Point {
	constructor(x = 0, y = 0) {
		this.X = x;
		this.Y = y;
	}

	Get() {
		return [
			this.X,
			this.Y
		];
	}
	//# Set(Point)
	//# Set(x = null, y = null)
	Set(x = null, y = null) {
		if(x instanceof Point) {
			let pos = x;
			this.X = pos.X;
			this.Y = pos.Y;

			return this;
		}

		this.X = (x === null || x === void 0) ? this.X : x;
		this.Y = (y === null || y === void 0) ? this.Y : y;

		return this;
	}
	//#	CalcNewPoint(Point)
	//#	CalcNewPoint(x, y)
	Merge(x = 0, y = 0) {
		let pos = {
			X: x,
			Y: y
		};
		
		if(x instanceof Point) {
			pos = x;
		} else {
			pos = Point.Generate(x, y);
		}

		this.X += pos.X;
		this.Y += pos.Y;

		return this;
	}

	//#	CalcNewPoint(Point)
	//#	CalcNewPoint(x, y)
	CalcNewPoint(x, y) {
		let pos;
		if(x instanceof Point) {
			pos = x;
		} else {
			pos = Point.Generate(x, y);
		}

		return Point.Generate(
			pos.X + this.X,
			pos.Y + this.Y
		);
	}


	//#	CalcDistance(Point)
	//#	CalcDistance(x, y)
	CalcDistance(x, y) {
		let pos;
		if(x instanceof Point) {
			pos = x;
		} else {
			pos = Point.Generate(x, y);
		}

		return Math.sqrt(
			Math.pow(pos.X - this.X, 2)
			+ Math.pow(pos.Y - this.Y, 2)
		);
	}

	Copy() {
		return this.CalcNewPoint(this.X, this.Y);
	}
	static Generate(x = 0, y = 0) {
		return new Point(x, y);
	}
	
}

export default Point;