import EnumComponentType from "../enum/ComponentType.js";
import EnumStateType from "../enum/StateType.js";
import EnumActionStateType from "../enum/ActionStateType.js";

import { Mutator } from "./Mutator.js";

class States extends Mutator {
	constructor(fk) {
		super(fk, EnumComponentType.STATES);
	}
	
	GetNormal(entity) {
		return this.GetComponent(entity).Elements[EnumStateType.NORMAL];
	}

	AddFlag(entity, ...flags) {
		this.GetNormal(entity).Add(...flags);

		return entity;
	}
	RemoveFlag(entity, ...flags) {
		this.GetNormal(entity).Remove(...flags);

		return entity;
	}
	HasFlag(entity, flag) {
		return this.GetNormal(entity).Has(flag);
	}
}

export { States };