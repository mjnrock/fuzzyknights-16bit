import { Creature } from "./Creature.js";

class Raccoon extends Creature {
	constructor(onload = null) {
		super("entity-raccoon", onload);
	}
}

export { Raccoon };