import { Event } from "./Event.js";

class EntityMoveEvent extends Event {
	constructor(entityIdentifier, x, y) {
		super(
			entityIdentifier,
			x,
			y
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.EntityMoveMessage);
	}
}

export { EntityMoveEvent };