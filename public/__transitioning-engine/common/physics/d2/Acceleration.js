import Angle from "./Angle.js";
import Velocity from "./Velocity.js";

class Acceleration {
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
	//#	Set(Acceleration)
	//#	Set(x, y, Angle)
	//#	Set(x = null, y = null, theta = null, isDegrees = null)
	Set(x = null, y = null, theta = null, isDegrees = null) {
		if(x instanceof Acceleration) {
			let accel = x;
			this.X = accel.X;
			this.Y = accel.Y;
			this.Angle.Set(accel.Angle);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && theta instanceof Acceleration) {
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
	//#	Merge(Acceleration)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, theta = null, isDegrees = null)
	Merge(x, y, theta, isDegrees = null) {
		if(x instanceof Acceleration) {
			let accel = x;
			this.X += accel.X;
			this.Y += accel.Y;
			this.Angle.Merge(accel.Angle);

			return this;
		} else if(typeof x === "number" && typeof y === "number" && theta instanceof Acceleration) {
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
	MergeMultiple(...accelerations) {
		accelerations.forEach(accel => {
			this.Merge(accel);
		});

		return this;
	}

	MergeFromForces(mass, ...forces) {
		forces.forEach(force => {
			this.Merge(Acceleration.FromForce(force, mass));
		});
		
		return this;
	}
	MergeFromImpulses(time, mass, ...forces) {
		forces.forEach(force => {
			this.Merge(Acceleration.FromImpulse(time, force, mass));
		});
		
		return this;
	}

	//#	Merge(Acceleration)
	//#	Merge(x, y, Angle)
	//#	Merge(x = null, y = null, r = null, isDegrees = null)
	CalcNewAcceleration(x, y, r, isDegrees = null) {
		let x0 = this.X,
			y0 = this.Y;

		if(x instanceof Acceleration) {
			let accel = x;
			x0 += accel.X;
			y0 += accel.Y;
			let angle = this.Angle.CalcNewAngle(accel.Theta, accel.IsDegrees);

			return Acceleration.Generate(x0, y0, angle);
		} else if(typeof x === "number" && typeof y === "number" && r instanceof Angle) {
			x0 += x;
			y0 += y;
			let angle = this.Angle.CalcNewAngle(r);

			return Acceleration.Generate(x0, y0, angle);
		}
		
		x0 += x;
		y0 += y;
		let angle = this.Angle.CalcNewAngle(r, isDegrees);

		return Acceleration.Generate(x0, y0, angle);
	}
	
	ConvertToVelocity(time, x0 = 0, y0 = 0, t0 = 0) {
		let dx = this.X * time,
			dy = this.Y * time,
			dt = this.Angle.Theta * time;

		return Velocity.Generate(dx + x0, dy + y0, dt + t0);
	}

	static FromForce(force, mass) {
		return new Acceleration(force.X / mass, force.Y / mass);
	}
	static FromImpulse(time, force, mass) {
		return new Acceleration(force.X / mass, force.Y / mass);
		// return new Acceleration(time * force.X / mass, time * force.Y / mass);
	}

	static Generate(x = 0, y = 0, r = 0, isDegrees = true) {
		if(typeof x === "number" && typeof y === "number" && r instanceof Angle) {
			isDegrees = r.IsDegrees;
			r = r.Theta;
		}

		return new Acceleration(x, y, r, isDegrees);
	}
}

export default Acceleration;