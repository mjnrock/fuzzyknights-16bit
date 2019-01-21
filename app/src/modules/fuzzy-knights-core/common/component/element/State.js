import { Element } from "engine/common/component/element/Element.js";
import Bitwise from "engine/common/utility/Functions.js";

class State extends Element {
	constructor(type, value) {
		super(type);
		
		this.Value = value;
	}

	Add(...flags) {
		this.Value = Bitwise.Add(this.Value, ...flags);

		return this;
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