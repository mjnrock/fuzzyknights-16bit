import { Event } from "../Event.js";

class InputKeyboardEvent extends Event {
	constructor(e) {
		super(
			"InputKeyboardEvent",
			e
		);
	}
}

export { InputKeyboardEvent };