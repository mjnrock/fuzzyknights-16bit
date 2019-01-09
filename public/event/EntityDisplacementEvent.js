import { Event } from "./Event.js";

class EntityDisplacementEvent extends Event {
	constructor(entity, displacement) {
		super(
			entity,
			displacement
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityDisplacementMessage);
	}
}

export { EntityDisplacementEvent };