import EnumCreatureType from "./../../component/enum/CreatureType.js";
import { Creature } from "./Creature.js";
import { Entity } from "../Entity.js";

class Raccoon extends Creature {
	constructor(x = -1, y = -1) {
		super(EnumCreatureType.HOSTILE, 2.25, 3);

		if(x !== -1 && y !== -1) {
			Entity.FuzzyKnights.Component.Mutator.Maps.SetPosition(this, x, y);
		}
	}

	Tick(time) {
		super.Tick(time);

		// let comp = Components.Mutator.Maps.GetComponent(this);
		// console.log(comp.ActiveMap.Position);
	}
}

export { Raccoon };