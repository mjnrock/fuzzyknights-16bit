import EnumComponentType from "../enum/ComponentType.js";

import { Mutator } from "./Mutator.js";

class Physics extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.PHYSICS);

		return comp;
	}

	GetMass(entity) {
		return this.GetComponent(entity).Kinetics.Mass;
	}
	SetMass(entity, value) {
		this.GetComponent(entity).Kinetics.Mass = value;

		return this;
	}

	GetDisplacement(entity) {
		return this.GetComponent(entity).Kinetics.Kinematics.Displacement;
	}
	SetDisplacement(entity, value) {
		this.GetComponent(entity).Kinetics.Kinematics.Displacement = value;

		return this;
	}

	GetVelocity(entity) {
		return this.GetComponent(entity).Kinetics.Kinematics.Velocity;
	}
	SetVelocity(entity, value) {
		this.GetComponent(entity).Kinetics.Kinematics.Velocity = value;

		return this;
	}

	GetAcceleration(entity) {
		return this.GetComponent(entity).Kinetics.Kinematics.Acceleration;
	}
	SetAcceleration(entity, value) {
		this.GetComponent(entity).Kinetics.Kinematics.Acceleration = value;

		return this;
	}

	GetForces(entity) {
		return this.GetComponent(entity).Kinetics.Forces;
	}
	SetForces(entity, value) {
		this.GetComponent(entity).Kinetics.Forces = value;

		return this;
	}

	IsCollidable(entity) {
		let mask = this.GetComponent(entity).CollisionMask;

		return mask !== null && mask !== void 0;
	}

	GetCollisionMask(entity) {
		return this.GetComponent(entity).CollisionMask;
	}
	SetCollisionMask(entity, mask) {
		this.GetComponent(entity).CollisionMask = mask;

		return this;
	}

	GetKinetics(entity) {
		return this.GetComponent(entity).Kinetics;
	}
	SetKinetics(entity, value) {
		this.GetComponent(entity).Kinetics = value;

		return this;
	}

	GetKinematics(entity) {
		return this.GetComponent(entity).Kinetics.Kinematics;
	}
	SetKinematics(entity, value) {
		this.GetComponent(entity).Kinetics.Kinematics = value;

		return this;
	}

	AddForce(entity, ...forces) {
		this.GetKinetics(entity).AddForce(...forces);
	}

	Tick(time, entity) {
		let kinetics = this.GetKinetics(entity),
			kinematics = kinetics.Kinematics;

		kinetics.ProcessImpulses(time);			// Convert Forces to Accelerations
		kinematics.ProcessAcceleration(time);	// Convert Accelerations to Velocities
		kinematics.ProcessVelocity(time);		// Convert Velocities to Displacements
		
		if(kinematics.Displacement.HasValues()) {
			this.FuzzyKnights.Event.Spawn.EntityDisplacementEvent(entity, kinematics.Displacement);
		}

		if(Math.random() < 0.25) {
console.log(`	Displacement: ${ kinematics.Displacement.Get().join(", ") },
	Velocity: ${ kinematics.Velocity.Get().join(", ") },
	Acceleration: ${ kinematics.Acceleration.Get().join(", ") }`);
		}
	}
}

export { Physics };