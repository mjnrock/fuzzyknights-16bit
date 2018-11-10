import EnumComponentType from "./../enum/ComponentType.js";
import EnumResourceType from "./../enum/ResourceType.js";

import { Mutator } from "./Mutator.js";

class Resources extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		return super.GetComponent(entity, EnumComponentType.RESOURCES);
	}
	
	GetHealth(entity) {
		return this.GetComponent(entity).Elements[EnumResourceType.HEALTH];
	}
	GetMana(entity) {
		return this.GetComponent(entity).Elements[EnumResourceType.MANA];
	}
}

export { Resources };