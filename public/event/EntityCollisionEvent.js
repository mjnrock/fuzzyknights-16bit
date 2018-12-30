import { Event } from "./Event.js";

class EntityCollisionEvent extends Event {
	constructor(collidor, collidee) {
		super(
			collidor,
			collidee
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityCollisionMessage);
	}
}

export { EntityCollisionEvent };