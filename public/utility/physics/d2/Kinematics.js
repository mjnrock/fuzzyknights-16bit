import Displacement from "./Displacement.js";
import Velocity from "./Velocity.js";
import Acceleration from "./Acceleration.js";

class Kinematics {
	constructor() {
		this.Displacement = Displacement.Generate();
		this.Velocity = Velocity.Generate();
		this.Acceleration = Acceleration.Generate();
	}

	ResetDisplacement() {
		this.Displacement = Displacement.Generate(0, 0);
	}
	ResetVelocity() {
		this.Velocity = Velocity.Generate(0, 0);
	}
	ResetAcceleration() {
		this.Acceleration = Acceleration.Generate(0, 0);
	}

	Accelerate(acceleration) {
		return Kinematics.ApplyAcceleration(this.Acceleration, acceleration);
	}
	Velocitize(velocity) {
		return Kinematics.ApplyVelocity(this.Velocity, velocity);
	}
	Displace(displacement) {
		return Kinematics.ApplyDisplacement(this.Displacement, displacement);
	}
	

	static ApplyAcceleration(base, accel) {
		if(base instanceof Acceleration && accel instanceof Acceleration) {
			return base.Merge(accel);
		}
	}
	static ApplyVelocity(base, veloc) {
		if(base instanceof Velocity && veloc instanceof Velocity) {
			return base.Merge(veloc);
		}
	}
	static ApplyDisplacement(base, displ) {
		if(base instanceof Displacement && displ instanceof Displacement) {
			return base.Merge(displ);
		}
	}
}

export default Kinematics;