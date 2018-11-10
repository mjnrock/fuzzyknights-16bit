import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class InputPlayerKeyStateMessage extends Message {
	constructor(keyState, isServerOrigin = false) {
		super(
			EnumHandlerType.INPUT,
			{
				KeyState: keyState
			},
			isServerOrigin
		);
	}
}

export { InputPlayerKeyStateMessage };