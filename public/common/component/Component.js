import { NewUUID } from "../utility/Functions.js";

class Component {
	constructor(type) {
		this.Type = type;
		this.UUID = NewUUID();
		
		this.Elements = {};
	}

	Serialize() {
		return JSON.stringify(this);
	}
	Deserialize(json) {
		let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

		this.Type = obj.Type;
		this.UUID = obj.UUID || NewUUID();
		this.Elements = obj.Elements || {};

		return obj;
	}
}

export { Component };