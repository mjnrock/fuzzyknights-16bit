import EnumComponentType from "../enum/ComponentType.js";
import EnumStateType from "../enum/StateType.js";

import { Mutator } from "./Mutator.js";

class States extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		return super.GetComponent(entity, EnumComponentType.STATES);
	}
	
	GetAction(entity) {
		return this.GetComponent(entity).Elements[EnumStateType.ACTION];
	}
	GetMovement(entity) {
		return this.GetComponent(entity).Elements[EnumStateType.MOVEMENT];
	}
}

export { States };