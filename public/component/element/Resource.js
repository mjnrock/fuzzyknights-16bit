import { LowerClamp, Clamp } from "./../../utility/Functions.js";

import { Element } from "./Element.js";

class Resource extends Element {
	constructor(type, current, max) {
		super(type);
		
		this.Current = current || 0;
		this.Max = max || this.Current;
	}
	
	Drain() {
		this.Current = 0;

		return this;
	}
	Refill() {
		this.Current = this.Max;

		return this;
	}

	GetCurrent() {
		return this.Current;
	}
	SetCurrent(current) {
		this.Current = Clamp(current, 0, this.Max);

		return this;
	}
	AddCurrent(value) {
		this.SetCurrent(this.Current + value);

		return this;
	}
	ReduceCurrent(value) {
		this.SetCurrent(this.Current - value);

		return this;
	}

	GetMax() {
		return this.Max;
	}
	SetMax(max) {
		this.Max = LowerClamp(max, 0);

		return this;
	}
	AddMax(value) {
		this.SetMax(this.Max + value);

		return this;
	}
	ReduceMax(value) {
		this.SetMax(this.Max - value);

		return this;
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);

		this.Current = obj.Current;
		this.Max = obj.Max;

		return obj;
	}
}

Resource.Unserialize = (json) => {
	let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

	let ret = new Resource();
	ret.Deserialize(obj);

	return ret;
}

export { Resource };