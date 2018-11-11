import { Event } from "./Event.js";

class EntityConstructionEvent extends Event {
	constructor(entity) {
		super(
			entity
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityConstructionMessage);
	}
}

export { EntityConstructionEvent };