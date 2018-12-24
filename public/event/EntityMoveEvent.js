import { Event } from "./Event.js";

class EntityMoveEvent extends Event {
	constructor(entityIdentifier, x0, y0, x1, y1) {
		super(
			entityIdentifier,
			x0,
			y0,
			x1,
			y1
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityMoveMessage);
	}
}

export { EntityMoveEvent };