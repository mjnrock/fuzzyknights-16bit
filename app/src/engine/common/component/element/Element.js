class Element {
	constructor(type) {
		this.Type = type;
	}

	GetType() {
		return this.Type;
	}

	Serialize() {
		return JSON.stringify(this);
	}
	Deserialize(json) {
		let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;
		
		this.Type = obj.Type;

		return obj;
	}
}

export { Element };