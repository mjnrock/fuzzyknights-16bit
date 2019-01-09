import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityDisplacementMessage extends Message {
	constructor(entity, displacement, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Entity: entity,
				Displacement: displacement
			},
			isServerOrigin
		);
	}
}

export { EntityDisplacementMessage };