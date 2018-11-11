import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";
import { State } from "./element/State.js";

class States extends Component {
	/**
	 * @param [[EnumStateType, ...values], ...]
	 */
	constructor(states = []) {
		super(EnumComponentType.STATES);

		for(let i in states) {
			this.Elements[states[i][0]] = new State(...states[i]);
		}
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);
		for(let k in obj.Elements) {
			let element = obj.Elements[k];
			this.Elements[k] = State.Unserialize(element);
		}

		return obj;
	}
}

States.Unserialize = (json) => {
	let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

	let ret = new States();
	ret.Deserialize(obj);

	return ret;
}

export { States };