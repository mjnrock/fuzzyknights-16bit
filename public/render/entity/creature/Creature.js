import { Entity } from "../Entity.js";

class Creature extends Entity {
	constructor(filename) {
		super(Entity.ENTITY(filename));
	}
}

export { Creature };