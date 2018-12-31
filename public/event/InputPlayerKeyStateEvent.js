import { Event } from "./Event.js";

class InputPlayerKeyStateEvent extends Event {
	constructor(keyState) {
		super(
			keyState
		);
		
		super.Invoke(Event.FuzzyKnights.Message.InputPlayerKeyStateMessage);
	}
}

export { InputPlayerKeyStateEvent };