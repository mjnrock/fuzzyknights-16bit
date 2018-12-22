import { Entity } from "../Entity.js";

class Creature extends Entity {
	constructor(fk, entity, filename) {
		super(fk, entity, Entity.ENTITY(filename));
	}
}

export { Creature };