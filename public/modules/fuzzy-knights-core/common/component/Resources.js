import { Component } from "/engine/common/component/Component.js";

import EnumComponentType from "./enum/ComponentType.js";
import EnumResourceType from "./enum/ResourceType.js";

import { Resource } from "./element/Resource.js";

class Resources extends Component {
	/**
	 * @param [[EnumResourceType, Current, Max], ...] resources 
	 */
	constructor(resources = []) {
		super(EnumComponentType.RESOURCES);

		if(resources.length === 0) {
			EnumResourceType.ForEach((k, res) => {
				this.Elements[res] = new Resource(res, 0);
			});
		} else {
			for(let i in resources) {
				this.Elements[resources[i][0]] = new Resource(...resources[i]);
			}
		}
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);
		for(let k in obj.Elements) {
			let element = obj.Elements[k];
			this.Elements[k] = Resource.Unserialize(element);
		}

		return obj;
	}

	static Unserialize = (json) => {
		let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;
	
		let ret = new Resources();
		ret.Deserialize(obj);
	
		return ret;
	}
}

export { Resources };