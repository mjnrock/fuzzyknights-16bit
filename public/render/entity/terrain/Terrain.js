import { Entity } from "./../Entity.js";

class Terrain extends Entity {
	constructor(filename, onload = null) {
		super(Entity.TERRAIN(filename), onload);
	}
}

export { Terrain };