import EnumComponentType from "../enum/ComponentType.js";

import { Mutator } from "./Mutator.js";

class RigidBody extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.RIGID_BODY);

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
}

export { RigidBody };