import Bitwise from "./../../utility/Bitwise.js";
import { Element } from "./Element.js";

class State extends Element {
	constructor(type, value) {
		super(type);
		
		this.Value = value;
	}

	Add(...flags) {
		return Bitwise.Add(this.Value, ...flags);
	}
	Remove(...flags) {
		this.Value = Bitwise.Remove(this.Value, ...flags);
		
		return this;
	}

	Has(flag) {
		return Bitwise.Has(this.Value, flag);
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);

		this.Value = obj.Value;

		return obj;
	}
}

State.Unserialize = (json) => {
	let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

	let ret = new State();
	ret.Deserialize(obj);

	return ret;
}

export { State };