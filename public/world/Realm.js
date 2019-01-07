import GridMap from "../utility/GridMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Realm {
	constructor() {
		this.Grid = {
			I: new GridMap(5, 5),
			II: new GridMap(5, 5),
			III: new GridMap(5, 5),
			IV: new GridMap(5, 5)
		};

		this.UUID = NewUUID();
	}

	Get(quad, x, y) {
		return this.Grid[quad].Get(x, y);
	}	
	Set(quad, x, y, value) {
		this.Grid[quad].Set(x, y, value);

		return this;
	}

	AddX(quad, nos = 1) {
		this.Grid[quad].AddX(nos);

		return this;
	}
	AddY(quad, nos = 1) {
		this.Grid[quad].AddY(nos);

		return this;
	}

	GetI(x, y) {
		return this.Grid.I.Get(x, y);
	}
	GetII(x, y) {
		return this.Grid.II.Get(x, y);
	}
	GetIII(x, y) {
		return this.Grid.III.Get(x, y);
	}
	GetIV(x, y) {
		return this.Grid.IV.Get(x, y);
	}

	SetI(x, y, value) {
		this.Grid.I.Set(x, y, value);

		return this;
	}
	SetII(x, y, value) {
		this.Grid.II.Set(x, y, value);

		return this;
	}
	SetIII(x, y, value) {
		this.Grid.III.Set(x, y, value);

		return this;
	}
	SetIV(x, y, value) {
		this.Grid.IV.Set(x, y, value);

		return this;
	}
}

export { Realm };