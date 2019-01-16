import { Terrain } from "./Terrain.js";

class Water extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "water", onload);
	}
}

export { Water };