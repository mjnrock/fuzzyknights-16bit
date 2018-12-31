import { Event } from "./Event.js";

class InputKeyboardEvent extends Event {
	constructor(e) {
		super(
			e
		);
		
		super.Invoke(Event.FuzzyKnights.Message.InputKeyboardMessage);
	}
}

export { InputKeyboardEvent };