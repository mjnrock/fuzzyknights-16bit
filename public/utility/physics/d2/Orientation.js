import Point from "./Point.js";
import Angle from "./Angle.js";

class Orientation {
	/**
	 * @param Point point 
	 * @param Angle angle 
	 */
	constructor(point, angle) {
		this.Point = point;
		this.Angle = angle;
	}

	Get() {
		return [
			...this.Point.Get(),
			...this.Angle.Get()
		];
	}
	//#	Generate(Point, Angle)
	//#	Generate(Point, z = 0, isDegrees = true)
	//#	Generate(x = 0, y = 0, z = 0, isDegrees = true)
	Set(x, y, r, isDegrees = true) {		
		if(x instanceof Point && y instanceof Angle) {
			this.Point = x;
			this.Angle = y;

			return this;
		} else if(x instanceof Point && typeof r === "number") {
			this.Point = x;
			this.Angle = Angle.Generate(r, isDegrees);

			return this;
		}
		
		if(x && y) {
			this.Point = Point.Generate(x, y);
		}
		if(r) {
			this.Angle = Angle.Generate(r, isDegrees);
		}

		return this;
	}
	//#	Generate(Point, Angle)
	//#	Generate(Point, z = 0, isDegrees = true)
	//#	Generate(x = 0, y = 0, z = 0, isDegrees = true)
	Merge(x, y, r, isDegrees = true) {		
		if(x instanceof Point && y instanceof Angle) {
			this.Point.Merge(x);
			this.Angle.Merge(y);

			return this;
		} else if(x instanceof Point && typeof r === "number") {
			this.Point.Merge(x);
			this.Angle.Merge(r, isDegrees);

			return this;
		}
		
		this.Point.Merge(x, y);
		this.Angle.Merge(r, isDegrees);

		return this;
	}

	//#	Generate(Point, Angle)
	//#	Generate(Point, z = 0, isDegrees = true)
	//#	Generate(x = 0, y = 0, z = 0, isDegrees = true)
	CalcNewOrientation(x, y, r, isDegrees = true) {		
		if(x instanceof Point && y instanceof Angle) {
			return Orientation.Generate(
				this.Point.CalcNewPoint(x),
				this.Angle.CalcNewAngle(y)
			);
		} else if(x instanceof Point && typeof r === "number") {
			return Orientation.Generate(
				this.Point.CalcNewPoint(x),
				this.Angle.CalcNewAngle(r, isDegrees)
			);
		}
		
		return Orientation.Generate(
			this.Point.CalcNewPoint(x, y),
			this.Angle.CalcNewAngle(r, isDegrees)
		);
	}

	Copy() {
		return this.CalcNewOrientation(this.Point.X, this.Point.Y, this.Angle.Theta, this.Angle.IsDegrees);
	}
	//#	Generate(Point, Angle)
	//#	Generate(Point)
	//#	Generate(x = 0, y = 0, z = 0, isDegrees = true)
	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		if(x instanceof Point && y instanceof Angle) {
			return new Orientation(x, y);
		} else if(x instanceof Point) {
			return new Orientation(x, new Angle(r, isDegrees));
		}

		return new Orientation(new Point(x, y), new Angle(r, isDegrees));
	}
}

export default Orientation;