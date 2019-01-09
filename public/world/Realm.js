import ElementMap from "../utility/ElementMap.js";
import { NewUUID } from "./../utility/Functions.js";

class Realm {
	constructor(size = 2) {
		this.Grid = {
			I: new ElementMap(size, size),
			II: new ElementMap(size, size),
			III: new ElementMap(size, size),
			IV: new ElementMap(size, size)
		};

		this.UUID = NewUUID();
	}

	FindZone(uuid, quad = null) {
		let comparator = (pos, ele, search, gm) => ele.UUID === search;

		if(quad) {
			return this.Grid[quad].Find(uuid, comparator);
		}

		let gms = Object.values(this.Grid),
			value;

		gridMapLoop:
		for(let q = 0; q < gms.length; q++) {
			value = this.Grid[q].Find(uuid, comparator);

			if(value) {
				break gridMapLoop;
			}
		}

		return value || false;
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

	static Generate(size = 2) {
		return new Realm(size);
	}
}

export { Realm };