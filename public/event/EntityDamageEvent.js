import { Event } from "./Event.js";

class EntityDamageEvent extends Event {
	constructor(target, source, damage) {
		super(
			target,
			source,
			damage
		);
		
		super.Invoke(Event.FuzzyKnights.Message.EntityDamageMessage);
	}
}

export { EntityDamageEvent };