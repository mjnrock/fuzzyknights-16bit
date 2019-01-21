import { NewUUID } from "./../utility/Functions.js";

class Entity {
	constructor(type) {
		this.Type = type;
		this.SubType = this.constructor.name;
		this.UUID = NewUUID();

		this.Components = [];
	}

	Tick(time) {
		this.Components.forEach((comp) => {
			Entity.FuzzyKnights.Common.Component.Mutator[comp.constructor.name].Tick(time, this);
		});
	}
}

export { Entity };