import { Mutator } from "engine/common/component/mutator/Mutator.js";

import EnumComponentType from "../enum/ComponentType.js";

class Physics extends Mutator {
	constructor(fk) {
		super(fk, EnumComponentType.PHYSICS);
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

	//TODO Don't encapulsate this so much, so that these can be edited better
	//TODO Aggregate the values first in temp variables then apply them, so they can be altered
	Tick(time, entity) {
		let kinetics = this.GetKinetics(entity),
			kinematics = kinetics.Kinematics;

		kinetics.ProcessImpulse(time);			// Process Impulse, Convert Forces to Accelerations
		kinematics.ProcessAcceleration(time);	// Process Accelerations, Convert Accelerations to Velocities
		
		if(kinematics.Velocity.HasValues()) {
			this.FuzzyKnights.Common.Event.Spawn.EntityVelocityEvent(entity, kinematics.Velocity, time);
			
			kinematics.ResetAcceleration();
		}
	}
}

export { Physics };