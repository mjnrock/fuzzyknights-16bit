import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor() {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Attributes(),
			new Components.Resources()
		);
	}

	Tick(time) {
		super.Tick(time);
		Components.Mutator.Maps.CalcPosition(this, time);
	}
}

export { Creature };