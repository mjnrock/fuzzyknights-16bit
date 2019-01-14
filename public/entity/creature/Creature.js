import CircleCollisionMask from "./../../physics/d2/CircleCollisionMask.js";

import EnumCreatureType from "./../../component/enum/CreatureType.js";
import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(type = EnumCreatureType.PASSIVE, speed = 1.0, fr = 1, x = -1, y = -1) {
		super(EnumEntityType.CREATURE);

		this.Components.push(
			new Components.Physics(
				new CircleCollisionMask(0, 0, Entity.FuzzyKnights.Game.Settings.View.Tile.Target / 4 * 1.05)	// Add 5% fudge
			),
			new Components.Attributes(),
			new Components.Resources([
				[ Entity.FuzzyKnights.Component.Enum.ResourceType.HEALTH, 125, 125],
				[ Entity.FuzzyKnights.Component.Enum.ResourceType.MANA, 20, 20]
			]),
			new Components.CreatureInfo(type, speed, fr)
		);

		if(x !== -1 && y !== -1) {
			Entity.FuzzyKnights.Component.Mutator.Worlds.SetPoint(this, x, y);
		}
	}
}

export { Creature };