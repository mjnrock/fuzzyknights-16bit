import { Event } from "../Event.js";

class EntityJoinWorldEvent extends Event {
	constructor(entity, zone) {
		super(
			"EntityJoinWorldEvent",
			entity,
			zone
		);
	}
}

export { EntityJoinWorldEvent };