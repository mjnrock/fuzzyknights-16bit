import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityMoveMessage extends Message {
	constructor(zone, entity, x0, y0, x1, y1, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Zone: zone,
                Entity: entity,
				Old: {
					X: x0,
					Y: y0
				},
				New: {
					X: x1,
					Y: y1
				}
			},
			isServerOrigin
		);
	}
}

export { EntityMoveMessage };