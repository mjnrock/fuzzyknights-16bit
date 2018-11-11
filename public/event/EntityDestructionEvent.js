import { Event } from "./Event.js";

class EntityDestructionEvent extends Event {
	constructor(entityIdentifier) {
		super(
			entityIdentifier
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityDestructionMessage);
	}
}

export { EntityDestructionEvent };