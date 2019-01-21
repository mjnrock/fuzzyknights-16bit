import { Component } from "/engine/common/component/Component.js";

import EnumComponentType from "./enum/ComponentType.js";
import EnumAttributeType from "./enum/AttributeType.js";

import { Attribute } from "./element/Attribute.js";

class Attributes extends Component {
	/**
	 * No param passed will result in ALL attributes being added with "value = 0"
	 * @param [[EnumAttributeType, Value, ?[Modifiers]], ...] attributes : [Modifiers] parameter is optional
	 */
	constructor(attributes = []) {
		super(EnumComponentType.ATTRIBUTES);

		if(attributes.length === 0) {
			EnumAttributeType.ForEach((k, attr) => {
				this.Elements[attr] = new Attribute(attr, 0);
			});
		} else {
			for(let i in attributes) {
				this.Elements[attributes[i][0]] = new Attribute(...attributes[i]);
			}
		}
	}
	
	RemoveExpiredModifiers() {
		for(let i in this.Elements) {
			this.Elements[i].RemoveExpiredModifiers();
		}
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);
		for(let k in obj.Elements) {
			let element = obj.Elements[k];
			this.Elements[k] = Attribute.Unserialize(element);
		}

		return obj;
	}

	static Unserialize = (json) => {
		let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;
	
		let ret = new Attributes();
		ret.Deserialize(obj);
	
		return ret;
	}
}

export { Attributes };