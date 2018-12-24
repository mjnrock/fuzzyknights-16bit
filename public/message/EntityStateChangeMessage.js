import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityStateChangeMessage extends Message {
	constructor(entityIdentifier, type, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                UUID: entityIdentifier,
				StateType: type
			},
			isServerOrigin
		);
	}
}

export { EntityStateChangeMessage };