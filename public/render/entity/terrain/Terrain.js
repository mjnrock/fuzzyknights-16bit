import { Entity } from "./../Entity.js";

class Terrain extends Entity {
	constructor(fk, entity, filename, onload = null) {
		super(fk, entity, Entity.TERRAIN(filename), onload);
	}

	Render() {
		let ret = super.Render();

		return [
			ret[0],
			ret[1],
			ret[2],
			null,
			0,		// tx - These need to change based on STATE
			0		// ty - These need to change based on STATE
		];
	}
}

export { Terrain };