import { Event } from "./Event.js";

class EntityStateChangeEvent extends Event {
	constructor(entityIdentifier, type, value) {
		super(
			entityIdentifier,
			type,
			value
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.EntityMoveMessage);
	}
}

export { EntityStateChangeEvent };