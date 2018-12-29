import { Creature } from "./Creature.js";

class Beaver extends Creature {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "beaver", onload);
	}
}

export { Beaver };