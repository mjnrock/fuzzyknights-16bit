import { Event } from "./Event.js";

class EntityDestructionEvent extends Event {
	constructor(entityIdentifier) {
		super(
			entityIdentifier
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.EntityDestructionMessage);
	}
}

export { EntityDestructionEvent };