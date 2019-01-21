import { Creature } from "/engine/common/entity/creature/Creature.js";

import EnumCreatureType from "./../../component/enum/CreatureType.js";

class Beaver extends Creature {
	constructor(x = -1, y = -1) {
		super(EnumCreatureType.HOSTILE, 1.25, 3, x, y);
	}
}

export { Beaver };