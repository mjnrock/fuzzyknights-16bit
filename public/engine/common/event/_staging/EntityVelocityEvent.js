import { Event } from "../Event.js";

class EntityVelocityEvent extends Event {
	constructor(entity, velocity, time) {
		super(
			"EntityVelocityEvent",
			entity,
			velocity,
			time
		);
	}
}

export { EntityVelocityEvent };