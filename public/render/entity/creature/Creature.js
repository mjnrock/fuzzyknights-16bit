import { Entity } from "../Entity.js";

class Creature extends Entity {
	constructor(filename, onload = null) {
		super(Entity.ENTITY(filename), onload);
	}
}

export { Creature };