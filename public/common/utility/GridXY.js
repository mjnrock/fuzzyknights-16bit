class GridXY {
	/**
	 * @param int width | GridXY width
	 * @param int height | GridXY height
	 * @param int type | The "instanceof {type}" or "typeof value === {type}" of the Type to enforce safe Sets
	 */
	constructor(xmax, ymax, type, seedFn = null) {
		this.XMax = xmax;
		this.YMax = ymax;
		this.Type = type;

		this.Elements = [];
		for(let y = 0; y < ymax; y++) {
			this.Elements.push([]);
			for(let x = 0; x < xmax; x++) {
				if(typeof seedFn === "function") {
					this.Elements[y].push(new type(...seedFn(x, y, this)));
				} else {
					this.Elements[y].push(null);
				}
			}
		}
	}

	/**
	 * @param any value | The value to search for
	 * @param function(value, this.Elements, this) comparator | A custom comparator function that should return TRUE or FALSE, otherwise the result will be implicitly converted to BOOLEAN anyway
	 * @returns obj//false | X, Y, Value found // FALSE
	 */
	Find(search, comparator = null) {
		for(let y = 0; y < this.YMax; y++) {
			for(let x = 0; x < this.XMax; x++) {
				if(this.Elements[y][x] === search) {
					return {
						X: x,
						Y: y,
						Value: this.Elements[y][x]
					};
				} else if(comparator && typeof comparator === "function") {
					if(comparator(search, this.Elements, this)) {
						return {
							X: x,
							Y: y,
							Value: this.Elements[y][x]
						};
					}
				}
			}
		}

		return false;
	}

	Get(x, y) {
		return this.Elements[y][x];
	}
	Set(x, y, value) {
		if((this.Type !== null && this.Type !== void 0) && ((typeof value === "object" && value instanceof this.Type) || typeof value === this.Type)) {
			this.Elements[y][x] = value;
		}

		return this;
	}

	Remove(x, y) {
		this.Elements[y][x] = null;

		return this;
	}

	IsEmpty(x, y) {
		return this.Elements[y][x] === null || this.Elements[y][x] === void 0;
	}
	Size() {
		return this.XMax * this.YMax;
	}

	ForEach(callback, args) {
		for(let y = 0; y < this.YMax; y++) {
			for(let x = 0; x < this.XMax; x++) {
				callback({X: x, Y: y}, this.Elements[y][x], this, args);
			}
		}

		return this;
	}

	ToArray() {
		let elements = [];
		for(let y = 0; y < this.YMax; y++) {
			elements.push(...this.Elements[y]);
		}

		return [...elements];
	}
}

export { GridXY };