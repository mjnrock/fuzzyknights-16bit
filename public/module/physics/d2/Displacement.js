import Angle from "./Angle.js";
import Point from "./Point.js";
import Orientation from "./Orientation.js";

class Displacement {
	constructor(x = 0, y = 0, r = 0, isDegrees = true) {
		this.X = x;
		this.Y = y;
		this.Angle = Angle.Generate(r, isDegrees);
	}

	HasValues() {
		return this.X !== 0 && this.Y !== 0 && this.Angle.Theta !== 0;
	}

	Get() {
		return [
			this.X,
			this.Y,
			...this.Angle.Get()
		];
	}
	//#	Set(Displacement)
	//#	Set(x, y, Angle)
	//#	Set(x = null, y = null, r = null, isDegrees = null)
	Set(x = null, y = null, r = null, isDegrees = null) {
		if(x instanceof Displacement) {
			let accel = x;
			this.X = accel.X;
			this.Y = accel.Y;
			this.Angle.Set(accel.Theta, accel.IsDegrees);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && r instanceof Displacement) {
			let angle = r;
			this.X = x;
			this.Y = y;
			this.Angle.Set(angle);

			return this;
		}

		this.X = (x === null || x === void 0) ? this.X : x;
		this.Y = (y === null || y === void 0) ? this.Y : y;
		this.Angle.Set(accel.Theta, accel.IsDegrees);

		return this;
	}
	//#	Merge(Displacement)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, theta = null, isDegrees = null)
	Merge(x, y, theta, isDegrees = null) {
		if(x instanceof Displacement) {
			let accel = x;
			this.X += accel.X;
			this.Y += accel.Y;
			this.Angle.Merge(accel.Theta, accel.IsDegrees);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && theta instanceof Angle) {
			let angle = theta;
			this.X += x;
			this.Y += y;
			this.Angle.Merge(angle);

			return this;
		}
		
		this.X += x;
		this.Y += y;
		this.Angle.Merge(theta, isDegrees);

		return this;
	}
	MergeMultiple(...displacements) {
		displacements.forEach(displ => {
			this.Merge(displ);
		});

		return this;
	}

	//#	Merge(Displacement)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, r = null, isDegrees = null)
	CalcNewDisplacement(x, y, r, isDegrees = null) {
		let x0 = this.X,
			y0 = this.Y;

		if(x instanceof Displacement) {
			let accel = x;
			x0 += accel.X;
			y0 += accel.Y;
			let angle = this.Angle.CalcNewAngle(accel.Theta, accel.IsDegrees);

			return Displacement.Generate(x0, y0, angle);
		} else if(typeof x === "number" && typeof y === "number" && r instanceof Angle) {
			let angle = r;
			x0 += x;
			y0 += y;
			let angle = this.Angle.CalcNewAngle(angle);

			return Displacement.Generate(x0, y0, angle);
		}
		
		x0 += x;
		y0 += y;
		let angle = this.Angle.CalcNewAngle(r, isDegrees);

		return Displacement.Generate(x0, y0, angle);
	}

	ConvertToPoint(x0 = 0, y0 = 0) {
		return Point.Generate(this.X + x0, this.Y + y0);
	}
	ConvertToOrientation(x0 = 0, y0 = 0, t0 = 0, isDegrees = true) {
		return Orientation.Generate(
			this.X + x0, this.Y + y0,
			this.Angle.CalcNewAngle(t0, isDegrees)
		);
	}

	static Generate(x = 0, y = 0, theta = 0, isDegrees = true) {
		if(typeof x === "number" && typeof y === "number" && theta instanceof Angle) {
			let angle = theta;
			isDegrees = angle.IsDegrees;
			theta = angle.Theta;
		}

		return new Displacement(x, y, theta, isDegrees);
	}
}

export default Displacement;