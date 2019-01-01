import EnumCreatureType from "./../../component/enum/CreatureType.js";
import { Creature } from "./Creature.js";
import { Entity } from "../Entity.js";

class Raccoon extends Creature {
	constructor(x = -1, y = -1) {
		super(EnumCreatureType.HOSTILE, 2.25, 3, x, y);
	}
}

export { Raccoon };