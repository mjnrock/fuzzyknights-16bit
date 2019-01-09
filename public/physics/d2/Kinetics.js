import Kinematics from "./Kinematics.js";
import Acceleration from "./../../../utility/_physics/Acceleration.js";

class Kinetics {
	constructor(mass = 1.0, kinematics = null, forces = null) {
		this.Mass = mass;
		this.Kinematics = kinematics || new Kinematics();
		this.Forces = forces || [];
	}

	AddForce(...forces) {
		this.Forces.push(...forces);

		return this;
	}
	RemoveForce(...indices) {
		let removed = [];

		for(let i in indices) {
			removed.push(this.Forces.splice(indices[i], 1));
		}

		return removed;
	}
	ResetForces() {
		this.Forces = [];
	}

	ProcessForces(time) {
		this.Kinematics.Acceleration.MergeFromForces(this.Mass, ...this.Forces);
		this.ResetForces();

		return this;
	}

	static ApplyForce(base, accel) {
		if(base instanceof Acceleration && accel instanceof Acceleration) {
			return base.Merge(accel);
		}
	}
}

export default Kinetics;