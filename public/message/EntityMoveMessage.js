import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityMoveMessage extends Message {
	constructor(entityIdentifier, x, y, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                UUID: entityIdentifier,
				X: x,
				Y: y
			},
			isServerOrigin
		);
	}
}

export { EntityMoveMessage };