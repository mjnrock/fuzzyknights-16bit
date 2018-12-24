import { Event } from "./Event.js";

class InputMouseEvent extends Event {
	constructor(e) {
		super(
			e
		);
		
		super.Invoke(Event.FuzzyKnights.Message.InputMouseMessage);
	}
}

export { InputMouseEvent };