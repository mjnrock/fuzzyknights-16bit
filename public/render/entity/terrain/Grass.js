import { Terrain } from "./Terrain.js";

class Grass extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "grass", onload);
	}
}

export { Grass };