//?	All constructs of Z are assumed to be the "Stacking Axis" for an X,Y Plane
class GridXYZ {
	/**
	 * @param int type | The "instanceof {type}" or "typeof value === {type}" of the Type to enforce safe Sets
	 */
	constructor(xmax, ymax, zmax, type) {
		this.XMax = xmax;
		this.YMax = ymax;
		this.ZMax = zmax;
		this.Type = type;

		this.Elements = [];
		for(let z = 0; z < zmax; z++) {
			this.Elements.push([]);
			for(let y = 0; y < ymax; y++) {
				this.Elements[z].push([]);
				for(let x = 0; x < xmax; x++) {
					this.Elements[z][y].push(null);
				}
			}
		}
	}

	/**
	 * @param any value | The value to search for
	 * @param function(value, this.Elements, this) comparator | A custom comparator function that should return TRUE or FALSE, otherwise the result will be implicitly converted to BOOLEAN anyway
	 * @returns obj//false | X, Y, Z, Value found // FALSE
	 */
	Find(search, comparator = null) {
		for(let z = 0; z < this.ZMax; y++) {
			for(let y = 0; y < this.YMax; y++) {
				for(let x = 0; x < this.XMax; x++) {
					if(this.Elements[z][y][x] === search) {
						return {
							X: x,
							Y: y,
							Z: z,
							Value: this.Elements[z][y][x]
						};
					} else if(comparator && typeof comparator === "function") {
						if(comparator(search, this.Elements, this)) {
							return {
								X: x,
								Y: y,
								Z: z,
								Value: this.Elements[z][y][x]
							};
						}
					}
				}
			}
		}

		return false;
	}

	Get(x, y, z) {
		return this.Elements[z][y][x];
	}
	Set(x, y, z, value) {
		if((this.Type !== null && this.Type !== void 0) && ((typeof value === "object" && value instanceof this.Type) || typeof value === this.Type)) {
			this.Elements[z][y][x] = value;
		}

		return this;
	}

	Remove(x, y, z) {
		this.Elements[z][y][x] = null;

		return this;
	}

	IsEmpty(x, y, z) {
		return this.Elements[z][y][x] === null || this.Elements[z][y][x] === void 0;
	}
	Size() {
		return this.XMax * this.YMax * this.ZMax;
	}

	ForEach(callback, args) {
		for(let z = 0; z < this.ZMax; z++) {
			for(let y = 0; y < this.YMax; y++) {
				for(let x = 0; x < this.XMax; x++) {
					callback(this.Get(x, y, z), this, args);
				}
			}
		}
	}
}

export { GridXYZ };