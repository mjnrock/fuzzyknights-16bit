import ClampedScalar from "../../utility/ClampedScalar.js";

import Angle from "./Angle.js";
import Displacement from "./Displacement.js";

class Velocity {
	constructor(x = 0, y = 0, r = 0, isDegrees = true) {
		this.X = x;
		this.Y = y;
		this.Angle = Angle.Generate(r, isDegrees);
	}

	HasValues() {
		return this.X !== 0 || this.Y !== 0 || this.Angle.Theta !== 0;
	}

	Get() {
		return [
			this.X,
			this.Y,
			...this.Angle.Get()
		];
	}
	//#	Set(Velocity)
	//#	Set(x, y, Angle)
	//#	Set(x = null, y = null, r = null, isDegrees = null)
	Set(x = null, y = null, theta = null, isDegrees = null) {
		if(x instanceof Velocity) {
			let veloc = x;
			this.X = veloc.X;
			this.Y = veloc.Y;
			this.Angle.Set(veloc.Angle);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && theta instanceof Angle) {
			let angle = theta;
			this.X = x;
			this.Y = y;
			this.Angle.Set(angle);

			return this;
		}

		this.X = (x === null || x === void 0) ? this.X : x;
		this.Y = (y === null || y === void 0) ? this.Y : y;
		this.Angle.Set(theta, isDegrees);

		return this;
	}
	//#	Merge(Velocity)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, r = null, isDegrees = null)
	Merge(x, y, theta, isDegrees = null) {
		if(x instanceof Velocity) {
			let veloc = x;
			this.X += veloc.X;
			this.Y += veloc.Y;
			this.Angle.Merge(veloc.Angle);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && theta instanceof Velocity) {
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
	MergeMultiple(...velocities) {
		velocities.forEach(velo => {
			this.Merge(velo);
		});

		return this;
	}

	//#	Merge(Velocity)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, r = null, isDegrees = null)
	CalcNewVelocity(x, y, r, isDegrees = null) {
		let x0 = this.X,
			y0 = this.Y;

		if(x instanceof Velocity) {
			let accel = x;
			x0 += accel.X;
			y0 += accel.Y;
			let angle = this.Angle.CalcNewAngle(accel.Theta, accel.IsDegrees);

			return Velocity.Generate(x0, y0, angle);
		} else if(typeof x === "number" && typeof y === "number" && r instanceof Angle) {
			x0 += x;
			y0 += y;
			let angle = this.Angle.CalcNewAngle(r);

			return Velocity.Generate(x0, y0, angle);
		}
		
		x0 += x;
		y0 += y;
		let angle = this.Angle.CalcNewAngle(r, isDegrees);

		return Velocity.Generate(x0, y0, angle);
	}
	
	ConvertToDisplacement(time, x0 = 0, y0 = 0, t0 = 0) {
		let dx = this.X * time,
			dy = this.Y * time,
			dt = this.Angle.Theta * time;

		return Displacement.Generate(dx + x0, dy + y0, dt + t0);
	}

	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		if(typeof x === "number" && typeof y === "number" && r instanceof Angle) {
			isDegrees = r.IsDegrees;
			r = r.Theta;
		}

		return new Velocity(x, y, r, isDegrees);
	}
}

export default Velocity;