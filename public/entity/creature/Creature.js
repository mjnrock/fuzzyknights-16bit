import EnumCreatureType from "./../../component/enum/CreatureType.js";
import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(type = EnumCreatureType.PASSIVE, speed = 3, fr = 1, x = -1, y = -1) {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Attributes(),
			new Components.Resources(),
			new Components.CreatureInfo(type, speed, fr)
		);

		if(x !== -1 && y !== -1) {
			Entity.FuzzyKnights.Component.Mutator.Maps.SetPosition(this, x, y);
		}
	}

	Tick(time) {
		super.Tick(time);
		let pos = Components.Mutator.Maps.CalcHeading(this, time);

		if(pos[0] !== pos[2] || pos[1] !== pos[3]) {
			Entity.FuzzyKnights.Event.Spawn.EntityMoveEvent(this.UUID, ...pos);
		}
	}
}

export { Creature };