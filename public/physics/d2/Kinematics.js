import Displacement from "./Displacement.js";
import Velocity from "./Velocity.js";
import Acceleration from "./Acceleration.js";

class Kinematics {
	constructor() {
		// this.Displacement = Displacement.Generate();
		this.Velocity = Velocity.Generate();
		this.Acceleration = Acceleration.Generate();
	}

	ResetKinematics() {
		this.Displacement = Displacement.Generate(0, 0);
		this.Velocity = Velocity.Generate(0, 0);
		this.Acceleration = Acceleration.Generate(0, 0);
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

	Accelerate(...accelerations) {
		return this.Acceleration.MergeMultiple(accelerations);
	}
	Velocitize(...velocities) {
		return this.Acceleration.MergeMultiple(velocities);
	}
	Displace(...displacements) {
		return this.Acceleration.MergeMultiple(displacements);
	}

	ProcessAcceleration(time) {
		if(this.Acceleration.HasValues()) {
			this.Velocity.Merge(this.Acceleration.ConvertToVelocity(time));
		}
	}
	ProcessVelocity(time) {
		if(this.Velocity.HasValues()) {
			this.Displacement.Merge(this.Velocity.ConvertToDisplacement(time));
		}
	}
}

export default Kinematics;