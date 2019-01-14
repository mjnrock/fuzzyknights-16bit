import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityStateChangeMessage extends Message {
	constructor(entity, type, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                Entity: entity,
				StateType: type
			},
			isServerOrigin
		);
	}
}

export { EntityStateChangeMessage };