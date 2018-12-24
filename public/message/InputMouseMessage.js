import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class InputMouseMessage extends Message {
	constructor(e, isServerOrigin = false) {
		super(
			EnumHandlerType.INPUT,
			{
				Event: e
			},
			isServerOrigin
		);
	}
}

export { InputMouseMessage };