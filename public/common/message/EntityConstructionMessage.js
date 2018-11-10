import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityConstructionMessage extends Message {
	constructor(entity, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
                Entity: entity
			},
			isServerOrigin
		);
	}
}

export { EntityConstructionMessage };