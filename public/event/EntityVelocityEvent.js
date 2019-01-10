import { Event } from "./Event.js";

class EntityVelocityEvent extends Event {
	constructor(entity, velocity, time) {
		super(
			entity,
			velocity,
			time
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityVelocityMessage);
	}
}

export { EntityVelocityEvent };