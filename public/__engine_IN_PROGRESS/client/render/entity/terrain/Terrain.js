import { Entity } from "./../Entity.js";

class Terrain extends Entity {
	constructor(fk, entity, filename, onload = null) {
		super(fk, entity, Entity.TERRAIN(filename), onload);
	}
}

export { Terrain };