import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityVelocityMessage extends Message {
	constructor(entity, velocity, time, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Entity: entity,
				Velocity: velocity,
				Time: time
			},
			isServerOrigin
		);
	}
}

export { EntityVelocityMessage };