import { Element } from "./Element.js";
import { AttributeModifier } from "./AttributeModifier.js";

class Attribute extends Element {
	constructor(type, value, modifiers = []) {
		super(type);
		
		this.Value = value;
		this.Modifiers = modifiers;
	}

	GetTotalValue() {		
		return this.Value + this.Modifiers.reduce((a, v) => a + v.Value, 0);		
	}

	GetValue() {
		return this.Value;
	}
	SetValue(value) {
		this.Value = value;
		
		return this;
	}
	AddValue(value) {
		this.SetValue(this.Value + value);
		
		return this;
	}
	
	GetModifiers() {
		return this.Modifiers;
	}
	SetModifiers(modifiers) {
		this.Modifiers = modifiers;
		
		return this;
	}
	AddModifier(...modifiers) {
		modifiers.forEach((v) => this.Modifiers.push(v));
		
		return this;
	}

	RemoveExpiredModifiers() {
		this.Modifiers = this.Modifiers.filter((v) => !v.IsExpired());

		return this;
	}

	Deserialize(json) {
		let obj = super.Deserialize(json);

		this.Value = obj.Value;
		for(let i in obj.Modifiers) {
			this.Modifiers.push(AttributeModifier.Unserialize(obj.Modifiers[i]));
		}

		return obj;
	}
}

Attribute.Unserialize = (json) => {
	let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

	let ret = new Attribute();
	ret.Deserialize(obj);

	return ret;
}
export { Attribute };