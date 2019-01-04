import { Terrain } from "./Terrain.js";

class Sand extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "sand", onload);
	}
}

export { Sand };