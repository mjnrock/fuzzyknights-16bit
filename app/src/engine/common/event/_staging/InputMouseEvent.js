import { Event } from "../Event.js";

class InputMouseEvent extends Event {
	constructor(e) {
		super(
			"InputMouseEvent",
			e
		);
	}
}

export { InputMouseEvent };