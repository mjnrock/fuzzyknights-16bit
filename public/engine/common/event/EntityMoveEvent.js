import { Event } from "./Event.js";

class EntityMoveEvent extends Event {
	constructor(zone, entity, x0, y0, x1, y1) {
		super(
			zone,
			entity,
			x0,
			y0,
			x1,
			y1
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.EntityMoveMessage);
	}
}

export { EntityMoveEvent };