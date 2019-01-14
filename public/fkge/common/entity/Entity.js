import { NewUUID } from "./../utility/Functions.js";
import Components from "./../component/package.js";

class Entity {
	constructor(type) {
		this.Type = type;
		this.SubType = this.constructor.name;
		this.UUID = NewUUID();

		this.Components = [];
		this.Components.push(
			new Components.States([
				[ Components.Enum.StateType.NORMAL, 0 ]
			]),
			new Components.Worlds()
		);
	}

	Tick(time) {
		this.Components.forEach((comp) => {
			Entity.FuzzyKnights.Common.Component.Mutator[comp.constructor.name].Tick(time, this);
		});
	}
}

export { Entity };