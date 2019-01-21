import { Event } from "../Event.js";

class EntityConstructionEvent extends Event {
	constructor(entity) {
		super(
			"EntityConstructionEvent",
			entity
		);
	}
}

export { EntityConstructionEvent };