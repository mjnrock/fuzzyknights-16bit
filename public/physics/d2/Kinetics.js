import Kinematics from "./Kinematics.js";
import Acceleration from "./Acceleration.js";

class Kinetics {
	constructor(mass = 1.0, kinematics = null, forces = null) {
		this.Mass = mass;
		this.Kinematics = kinematics || new Kinematics();
		this.Forces = forces || [];
	}

	Get() {
		console.log(this.Forces);
		return {
			Mass: this.Mass,
			Forces: this.Forces.map(f => f.Get()),
			Acceleration: this.Kinematics.Acceleration.Get(),
			Velocity: this.Kinematics.Velocity.Get()
		};
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
		
		return this;
	}

	ResetKinetics() {
		this.ResetForces();
		this.Kinematics.ResetKinematics();
		
		return this;
	}

	ProcessImpulse(time) {
		this.Kinematics.Acceleration.MergeFromImpulses(time, this.Mass, ...this.Forces);
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