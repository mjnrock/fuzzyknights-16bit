import { Event } from "./Event.js";

class InputKeyboardEvent extends Event {
	constructor(e) {
		super(
			e
		);
		
		super.Invoke(Event.FuzzyKnights.Common.Message.InputKeyboardMessage);
	}
}

export { InputKeyboardEvent };