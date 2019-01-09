class ElementMap {
	constructor(width, height, seedFn = null) {
		this.Width = width;
		this.Height = height;

		this.XMax = this.Width - 1;
		this.YMax = this.Height - 1;

		this.Elements = {};

		if(typeof seedFn === "function") {
			seedFn(this);
			this.SeedFunction = seedFn;
		} else {
			this.Init();	
		}
	}

	Init(seed = null) {
		for(let i = 0; i < this.Width; i++) {
			for(let j = 0; j < this.Height; j++) {
				this.Set(i, j, seed);
			}
		}
	}

	AddX(nos = 1) {
		this.Width += nos;
		this.XMax += nos;

		return this;
	}
	AddY(nos = 1) {
		this.Height += nos;
		this.YMax += nos;

		return this;
	}

	Get(x, y) {
		return this.Elements[`${ x },${ y }`];
	}
	Set(x, y, value) {
		this.Elements[`${ x },${ y }`] = value;

		return this;
	}

	GetNeighbors(x, y, r) {
		x = ~~x; y = ~~y; r = ~~r;

		let xl = x - r,
			yl = y - r,
			xr = x + r,
			yr = y + r,
			neighbors = [];

		for(let i = xl; i <= xr; i++) {
			for(let j = yl; j <= yr; j++) {
				if(i >= 0 && j >= 0) {
					neighbors.push({
						Position: {
							X: i,
							Y: j
						},
						Element: this.Get(i, j)
					});
				}
			}
		}

		return neighbors;
	}

	/**
	 * @param any value | The value to search for
	 * @param function(value, this.Elements, this) comparator | A custom comparator function that should return TRUE or FALSE, otherwise the result will be implicitly converted to BOOLEAN anyway
	 * @returns obj//false | X, Y, Value found // FALSE
	 */
	Find(search, comparator = null) {
		for(let x = 0; x < this.Width; x++) {
			for(let x = 0; x < this.Height; x++) {
				if(this.Get(x, y) === search) {
					return {
						X: x,
						Y: y,
						Value: this.Get(x, y)
					};
				} else if(comparator && typeof comparator === "function") {
					if(comparator({
						X: x,
						Y: y
					}, this.Get(x, y), search, this)) {
						return {
							X: x,
							Y: y,
							Value: this.Get(x, y)
						};
					}
				}
			}
		}

		return false;
	}
	
	Remove(x, y) {
		this.Elements[y][x] = null;

		return this;
	}
	IsEmpty(x, y) {
		return this.Elements[y][x] === null || this.Elements[y][x] === void 0;
	}

	Size() {
		return this.Width * this.Height;
	}

	ForEach(callback, ...args) {
		Object.entries(this.Elements).forEach(([ key, value] = kv) => {
			let pos = key.split(",");
			callback({
				X: +pos[0],
				Y: +pos[1]
			}, value, this, ...args);
		});

		return this;
	}

	WindowedForEach(x, y, w, h, callback, ...args) {
		x = ~~x; y = ~~y;

		let xl = x,
			yl = y,
			xr = x + w,
			yr = y + h;

		for(let i = xl; i <= xr; i++) {
			for(let j = yl; j <= yr; j++) {
				let value = this.Get(i, j);

				if(value) {
					callback({
						X: i,
						Y: j,
					}, value, this, ...args);
				}
			}
		}

		return this;
	}

	ForEachNeighbor(x, y, r, callback, ...args) {
		x = ~~x; y = ~~y; r = ~~r;

		let xl = x - r,
			yl = y - r,
			xr = x + r,
			yr = y + r;

		for(let i = xl; i <= xr; i++) {
			for(let j = yl; j <= yr; j++) {
				let value = this.Get(i, j);

				if(value) {
					callback({
						X: i,
						Y: j,
					}, value, this, ...args);
				}
			}
		}

		return this;
	}

	ToArray() {
		let arr = [];

		Object.entries(this.Elements).forEach(([ key, value] = kv) => {
			arr.push([ key, value ]);
		});

		return arr;
	}

	CopyTemplate() {
		return new ElementMap(this.Width, this.Height, this.SeedFunction || null);
	}
}

export default ElementMap;