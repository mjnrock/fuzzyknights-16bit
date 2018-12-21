import { NewUUID } from "../utility/Functions.js";
import Components from "./../component/package.js";

class Entity {
	constructor(type) {
		this.Type = type;
		this.SubType = this.constructor.name;
		this.UUID = NewUUID();

		this.Components = [];
		this.Components.push(
			new Components.States([
				[ Components.Enum.StateType.ACTION, 0 ],
				[ Components.Enum.StateType.MOVEMENT, 0 ]
			])
		);
	}

	Tick(time) {
		// console.log("Entity - Tick", this.UUID, time);
	}
}

export { Entity };