import EnumComponentType from "../enum/ComponentType.js";
import EnumAttributeType from "../enum/AttributeType.js";

import { Mutator } from "./Mutator.js";

class Attributes extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		//? Decorator cleanup for expirations
		let comp = super.GetComponent(entity, EnumComponentType.ATTRIBUTES);
		comp.RemoveExpiredModifiers();

		return comp;
	}
	
	GetMight(entity) {
		return this.GetComponent(entity).Elements[EnumAttributeType.MIGHT];
	}
	GetToughness(entity) {
		return this.GetComponent(entity).Elements[EnumAttributeType.TOUGHNESS];
	}

	MergeAttributes(entity, component, excludedAttributes = [], mergeModifiers = false) {
		console.log(this.GetComponent(entity).Elements);

		for(let k in component.Elements) {
			let attr = this.GetComponent(entity).Elements[k];

			if(!excludedAttributes.includes(+k)) {
				if(attr) {
					attr.AddValue(component.Elements[k].GetValue());
					
					if(mergeModifiers) {
						attr.AddModifier(...component.Elements[k].Modifiers);
					}
				} else {
					this.GetComponent(entity).Elements[k] = component.Elements[k];
					
					if(!mergeModifiers) {
						this.GetComponent(entity).Elements[k].Modifiers = [];
					}
				}
			}
		}

		console.log(this.GetComponent(entity).Elements);

		return this;
	}
}

export { Attributes };