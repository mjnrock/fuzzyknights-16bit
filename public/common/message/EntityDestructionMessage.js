import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityDestructionMessage extends Message {
	constructor(entityIdentifier, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                UUID: entityIdentifier
			},
			isServerOrigin
		);
	}
}

export { EntityDestructionMessage };