import { Event } from "./Event.js";

class EntityStateChangeEvent extends Event {
	constructor(entity, type) {
		super(
			entity,
			type
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityStateChangeMessage);
	}
}

export { EntityStateChangeEvent };