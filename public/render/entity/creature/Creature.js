import { Entity } from "../Entity.js";

class Creature extends Entity {
	constructor(fk, entity, filename, onload = null) {
		super(fk, entity, Entity.ENTITY(filename), onload);
	}
}

export { Creature };