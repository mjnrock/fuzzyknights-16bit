import EnumCreatureType from "./../../component/enum/CreatureType.js";
import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(type = EnumCreatureType.PASSIVE, speed = 3, fr = 1) {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Attributes(),
			new Components.Resources(),
			new Components.CreatureInfo(type, speed, fr)
		);
	}

	Tick(time) {
		super.Tick(time);
		let pos = Components.Mutator.Maps.CalcPosition(this, time);

		if(pos[0] !== pos[2] || pos[1] !== pos[3]) {
			Entity.FuzzyKnights.Event.Spawn.EntityMoveEvent(this.UUID, ...pos);
		}
	}
}

export { Creature };