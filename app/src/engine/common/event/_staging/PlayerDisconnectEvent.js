import { Event } from "../Event.js";

class PlayerDisconnectEvent extends Event {
	constructor(uuid) {
		super(
			"PlayerDisconnectEvent",
			uuid
		);
	}
}

export { PlayerDisconnectEvent };