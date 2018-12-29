import { Terrain } from "./Terrain.js";

class Water extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "water", onload);
	}

	Render() {
		let ret = super.Render();

		return [
			ret[0],
			ret[1],
			ret[2],
			null,	// Tile color overlay
			0,		// tx - These need to change based on STATE
			0		// ty - These need to change based on STATE
		];
	}
}

export { Water };