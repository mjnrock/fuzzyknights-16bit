import EnumComponentType from "./../enum/ComponentType.js";
import EnumResourceType from "./../enum/ResourceType.js";

import { Mutator } from "./Mutator.js";

class Resources extends Mutator {
	constructor(fk) {
		super(fk, EnumComponentType.RESOURCES);
	}
	
	GetHealth(entity) {
		return this.GetComponent(entity).Elements[EnumResourceType.HEALTH];
	}
	GetMana(entity) {
		return this.GetComponent(entity).Elements[EnumResourceType.MANA];
	}
}

export { Resources };