import { Event } from "../Event.js";

class EntityDamageEvent extends Event {
	constructor(target, source, damage) {
		super(
			"EntityDamageEvent",
			target,
			source,
			damage
		);
	}
}

export { EntityDamageEvent };