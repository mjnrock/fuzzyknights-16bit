//* Presently not sure about this Enum, but the hope is that it will become very useful when maintaining modifiers with multiple skills, abilities, equipment, and levels in play
import EnumAttributeModifierType from "./../enum/AttributeModifierType.js";

class AttributeModifier {
	constructor(value, duration, type = EnumAttributeModifierType.GENERIC) {
		this.Type = type;
		this.Value = value;

		if(this.Type === EnumAttributeModifierType.INHERENT) {
			this.Duration = AttributeModifier.PERSISTENCE_FLAG;
		} else {
			//@param Duration	The duration in milliseconds
			this.Duration = duration;
		}
		this.Timestamp = Date.now();
	}

	GetType() {
		return this.Type;
	}
	SetType(type) {
		this.Type = type;

		return ;
	}

	GetValue() {
		return this.Value;
	}
	SetValue(value) {
		this.Value = value;
		
		return this;
	}

	GetDuration() {
		return this.Duration;
	}
	SetDuration(duration) {
		this.Duration = duration;
		
		return this;
	}

	FlagExpired() {
		this.Duration = AttributeModifier.EXPIRATION_FLAG;

		return this;
	}
	FlagPersistence() {
		this.Duration = AttributeModifier.PERSISTENCE_FLAG;

		return this;
	}

	IsExpired() {
		if(this.Duration === AttributeModifier.PERSISTENCE_FLAG) {
			return false;
		} else if(this.Duration === AttributeModifier.EXPIRATION_FLAG) {
			return true;
		}

		return this.Timestamp + this.Duration < Date.now();
	}
	

	Serialize() {
		return JSON.stringify(this);
	}
	Deserialize(json) {
		let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

		this.Type = obj.Type;
		this.Value = obj.Value;
		this.Duration = obj.Duration;
		this.Timestamp = obj.Timestamp;

		return obj;
	}
}
AttributeModifier.EXPIRATION_FLAG = 0;
AttributeModifier.PERSISTENCE_FLAG = -1;


AttributeModifier.Unserialize = (json) => {
	let obj = typeof json === "string" || json instanceof String ? JSON.parse(json) : json;

	let ret = new AttributeModifier();
	ret.Deserialize(obj);

	return ret;
}
export { AttributeModifier };