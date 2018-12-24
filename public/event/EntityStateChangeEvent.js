import { Event } from "./Event.js";

class EntityStateChangeEvent extends Event {
	constructor(entityIdentifier, type) {
		super(
			entityIdentifier,
			type
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityStateChangeMessage);
	}
}

export { EntityStateChangeEvent };