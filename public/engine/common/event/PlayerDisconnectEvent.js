import EnumHandlerType from "../enum/HandlerType.js";
import EnumEventType from "../enum/EventType.js";

import { Event } from "./Event.js";

class PlayerDisconnectEvent extends Event {
	constructor(uuid) {
		super(
			uuid
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.PlayerDisconnectMessage);
	}
}

export { PlayerDisconnectEvent };