import EnumHandlerType from "../enum/HandlerType.js";
import { Message } from "./Message.js";

class InputKeyboardMessage extends Message {
	constructor(e, isServerOrigin = false) {
		super(
			EnumHandlerType.INPUT,
			{
				EventData: {
					altKey: e.altKey,
					ctrlKey: e.ctrlKey,
					keyCode: e.keyCode,
					repeat: e.repeat,
					shiftKey: e.shiftKey,
					type: e.type
				}
			},
			isServerOrigin
		);
	}
}

export { InputKeyboardMessage };