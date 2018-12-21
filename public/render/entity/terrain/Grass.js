import { Terrain } from "./Terrain.js";

class Grass extends Terrain {
	constructor(onload = null) {
		super("grass", onload);
	}
}

export { Grass };