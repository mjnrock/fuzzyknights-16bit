import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class PlayerConnectMessage extends Message {
	constructor(uuid, isServerOrigin = false) {
		super(
			EnumHandlerType.PLAYER,
			{
				UUID: uuid
			},
			isServerOrigin
		);
	}
}

export { PlayerConnectMessage };