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

	CheckCollisionMask(collidor, collidee) {
		let mOr = this.GetCollisionMask(collidor),
			mEe = this.GetCollisionMask(collidee);

		
	}

	Tick(time, entity) {
		let kinetics = this.GetKinetics(entity),
			kinematics = kinetics.Kinematics;

		kinetics.ProcessForces(time);			// Convert Forces to Accelerations
		kinematics.ProcessAcceleration(time);	// Convert Accelerations to Velocities
		kinematics.ProcessVelocity(time);		// Convert Velocities to Displacements
		
		if(kinematics.Displacement.HasValues()) {
			this.FuzzyKnights.Event.Spawn.EntityDisplacementEvent(entity, kinematics.Displacement);
		}
	}
}

export { Physics };