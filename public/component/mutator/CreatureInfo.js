import EnumComponentType from "../enum/ComponentType.js";
import EnumCreatureType from "./../enum/CreatureType.js";

import { Mutator } from "./Mutator.js";

class CreatureInfo extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.CREATURE_INFO);

		return comp;
	}

	GetCreatureType(entity) {
		return this.GetComponent(entity).CreatureType;
	}
	SetCreatureType(entity, ct) {
		this.GetComponent(entity).CreatureType = ct;

		return this;
	}
	
	MakePassive(entity) {
		this.GetComponent(entity).CreatureType = EnumCreatureType.PASSIVE;

		return this;
	}
	MakeFriendly(entity) {
		this.GetComponent(entity).CreatureType = EnumCreatureType.FRIENDLY;

		return this;
	}
	MakeHostile(entity) {
		this.GetComponent(entity).CreatureType = EnumCreatureType.HOSTILE;

		return this;
	}

	GetSpeed(entity) {
		return this.GetComponent(entity).Speed;
	}
	SetSpeed(entity, speed) {
		this.GetComponent(entity).Speed = speed;

		return this;
	}

	GetFollowRange(entity) {
		return this.GetComponent(entity).FollowRange;
	}
	SetFollowRange(entity, fr) {
		this.GetComponent(entity).FollowRange = fr;

		return this;
	}
}

export { CreatureInfo };