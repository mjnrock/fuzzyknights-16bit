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
		Components.Mutator.Maps.CalcPosition(this, time);
	}
}

export { Creature };