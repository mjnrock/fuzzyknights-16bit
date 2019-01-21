import { Event } from "../Event.js";

class EntityDestructionEvent extends Event {
	constructor(entityIdentifier) {
		super(
			"EntityDestructionEvent",
			entityIdentifier
		);
	}
}

export { EntityDestructionEvent };