import { Event } from "../Event.js";

class EntityCollisionEvent extends Event {
	constructor(collidor, collidee) {
		super(
			"EntityCollisionEvent",
			collidor,
			collidee
		);
	}
}

export { EntityCollisionEvent };