import { Creature } from "./Creature.js";

class Raccoon extends Creature {
	constructor(fk, entity) {
		super(fk, entity, "entity-raccoon");
	}
}

export { Raccoon };