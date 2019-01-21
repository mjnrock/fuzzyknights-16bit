import EnumEntityType from "engine/common/enum/bitwise/EntityType.js";
import { Entity } from "engine/common/entity/Entity.js";

import EnumCreatureType from "./../../component/enum/CreatureType.js";
import EnumResourceType from "./../../component/enum/ResourceType.js";
import Components from "./../../component/package.js";

class Creature extends Entity {
	constructor(type = EnumCreatureType.PASSIVE, speed = 1.0, fr = 1, x = -1, y = -1) {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Attributes(),
			new Components.Resources([
				[ EnumResourceType.HEALTH, 125, 125],
				[ EnumResourceType.MANA, 20, 20]
			]),
			new Components.CreatureInfo(type, speed, fr)
		);
	}
}

export { Creature };