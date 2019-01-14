import { Event } from "./Event.js";

class EntityJoinWorldEvent extends Event {
	constructor(entity, zone) {
		super(
			entity,
			zone
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.EntityJoinWorldMessage);
	}
}

export { EntityJoinWorldEvent };