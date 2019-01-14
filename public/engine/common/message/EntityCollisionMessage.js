import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityCollisionMessage extends Message {
	constructor(collidor, collidee, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Collidor: collidor,
				Collidee: collidee
			},
			isServerOrigin
		);
	}
}

export { EntityCollisionMessage };