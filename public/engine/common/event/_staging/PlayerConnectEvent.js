import { Event } from "../Event.js";

class PlayerConnectEvent extends Event {
	constructor(uuid) {
		super(
			"PlayerConnectEvent",
			uuid
		);
	}
}

export { PlayerConnectEvent };