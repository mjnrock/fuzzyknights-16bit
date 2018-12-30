import { Event } from "./Event.js";

class EntityJoinWorldEvent extends Event {
	constructor(entity, map) {
		super(
			entity,
			map
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityJoinWorldMessage);
	}
}

export { EntityJoinWorldEvent };