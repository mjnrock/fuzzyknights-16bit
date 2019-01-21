import { Event } from "../Event.js";

class InputPlayerKeyStateEvent extends Event {
	constructor(keyState) {
		super(
			"InputPlayerKeyStateEvent",
			keyState
		);
	}
}

export { InputPlayerKeyStateEvent };