import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityJoinWorldMessage extends Message {
	constructor(entity, zone, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Entity: entity,
				Zone: zone
			},
			isServerOrigin
		);
	}
}

export { EntityJoinWorldMessage };