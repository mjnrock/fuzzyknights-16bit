import { Creature } from "./Creature.js";

class Raccoon extends Creature {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "raccoon", onload);
	}
}

export { Raccoon };