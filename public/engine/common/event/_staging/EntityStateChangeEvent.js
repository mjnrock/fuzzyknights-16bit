import { Event } from "../Event.js";

class EntityStateChangeEvent extends Event {
	constructor(entity, type) {
		super(
			"EntityStateChangeEvent",
			entity,
			type
		);
	}
}

export { EntityStateChangeEvent };