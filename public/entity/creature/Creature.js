import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(components = []) {
		super(EnumEntityType.CREATURE);

		this.Components = [
			...components
		];
	}
}

export { Creature };