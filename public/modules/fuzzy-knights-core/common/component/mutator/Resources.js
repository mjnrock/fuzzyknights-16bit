import { Mutator } from "/engine/common/component/mutator/Mutator.js";

import EnumComponentType from "./../enum/ComponentType.js";
import EnumResourceType from "./../enum/ResourceType.js";

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