import EnumCreatureType from "../../component/enum/CreatureType.js";
import { Creature } from "./Creature.js";
import { Entity } from "../Entity.js";

class Beaver extends Creature {
	constructor(x = -1, y = -1) {
		super(EnumCreatureType.HOSTILE, 1.25, 3, x, y);
	}

	Tick(time) {
		super.Tick(time);

		// let comp = Components.Mutator.Maps.GetComponent(this);
		// console.log(comp.ActiveMap.Position);
	}
}

export { Beaver };