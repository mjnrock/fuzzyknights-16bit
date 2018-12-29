import { Terrain } from "./Terrain.js";

class Grass extends Terrain {
	constructor(fk, entity, onload = null) {
		super(fk, entity, "grass", onload);
	}

	Render() {
		let ret = super.Render();

		return [
			ret[0],
			ret[1],
			ret[2],
			"rgb(69, 161, 99)",
			0,		// tx - These need to change based on STATE
			0		// ty - These need to change based on STATE
		];
	}
}

export { Grass };