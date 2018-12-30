import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class EntityJoinWorldMessage extends Message {
	constructor(entity, mapId, isServerOrigin = false) {
		super(
			EnumHandlerType.ENTITY,
			{
				Entity: entity,
				MapId: mapId
			},
			isServerOrigin
		);
	}
}

export { EntityJoinWorldMessage };