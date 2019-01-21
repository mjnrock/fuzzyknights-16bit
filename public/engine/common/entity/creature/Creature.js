
import EnumCreatureType from "./../../component/enum/CreatureType.js";
import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(type = EnumCreatureType.PASSIVE, speed = 1.0, fr = 1, x = -1, y = -1) {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Attributes(),
			new Components.Resources([
				[ Entity.FuzzyKnights.Common.Component.Enum.ResourceType.HEALTH, 125, 125],
				[ Entity.FuzzyKnights.Common.Component.Enum.ResourceType.MANA, 20, 20]
			]),
			new Components.CreatureInfo(type, speed, fr)
		);

		if(x !== -1 && y !== -1) {
			Entity.FuzzyKnights.Common.Component.Mutator.Worlds.SetPoint(this, x, y);
		}
	}
}

export { Creature };