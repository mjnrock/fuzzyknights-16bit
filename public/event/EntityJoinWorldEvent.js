import { Event } from "./Event.js";

class EntityJoinWorldEvent extends Event {
	constructor(entity, zone) {
		super(
			entity,
			zone
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityJoinWorldMessage);
	}
}

export { EntityJoinWorldEvent };