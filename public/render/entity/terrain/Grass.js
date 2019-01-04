import { Terrain } from "./Terrain.js";

class Grass extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "grass", onload);
	}

	GetTileColor() {
		return "rgb(69, 161, 99)";
	}
}

export { Grass };