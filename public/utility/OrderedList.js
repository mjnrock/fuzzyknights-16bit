class OrderedList {
	constructor(...elements) {
		this.IsDirty = false;
		this.Elements = [];

		if(elements[0] !== null && elements[0] !== void 0) {
			this.Push(...elements);
		}
	}

	ToArray() {
		this.Sort();

		return this.Elements.map((v) => v.v);
	}

	Get(index) {
		this.Sort();

		let ret = this.Elements.filter((v) => +v.i === +index);

		return ret.length ? ret[0] : null;
	}
	Set(index, value) {
		this.Elements.push({
			i: +index,
			v: value
		});

		this.IsDirty = true;
		return this;
	}

	Contains(item) {
		if(this.Elements.length === 0) {
			return false;
		}

		return this.Elements.map((v) => v.v).includes(item);
	}

	Remove(index) {
		this.Sort();
		
		this.Elements = this.Elements.filter((v) => +v.i !== +index);

		this.IsDirty = true;
		return this;
	}
	/**
	 * @param any value | The Value entry to remove, if present
	 * @param function(value, this.Elements, this) filter | A custom function to pass if a strict equality comparison is not appropriate for the Elements "Value" type
	 */
	RemoveByValue(search, filter = null) {
		if(filter && typeof filter === "function") {
			this.Elements = filter(search, this.Elements, this);
		} else {
			this.Elements = this.Elements.filter((v) => v.value !== search);
		}

		this.IsDirty = true;
		return this;
	}

	Swap(index1, index2) {
		let v1 = this.Get(index1),
			v2 = this.Get(index2);

		if(v1 && v2) {
			v1.i = +index2;
			v2.i = +index1;
		}

		this.IsDirty = true;
		return this;
	}

	Promote(index) {
		this.Sort();

		let v1 = this.Get(index),
			v2 = this.Get(index - 1);
		if(v1) {
			--v1.i;

			if(v2) {
				++v2.i;
			}
		}

		this.IsDirty = true;
		return this;
	}
	Demote(index) {
		this.Sort();

		let v1 = this.Get(index),
			v2 = this.Get(index + 1);
		if(v1) {
			++v1.i;

			if(v2) {
				--v2.i;
			}
		}

		this.IsDirty = true;
		return this;
	}

	Push(value) {
		this.Sort();


		this.Elements.push({
			i: this.Elements.length,
			v: value
		})

		return this;
	}
	Pop() {
		this.Sort();

		return this.Elements[this.Elements.length - 1];
	}

	Size() {
		return this.Elements.length;
	}

	Sort() {
		if(!!this.Elements.length && this.IsDirty) {
			this.Elements.sort((a, b) => +a.i < +b.i ? -1 : (+a.i > +b.i ? 1 : 0));
			this.Elements.forEach((v, i) => {
				v.i = +i;
			});
		}
		this.IsDirty = false;

		return this;
	}
}

export { OrderedList };