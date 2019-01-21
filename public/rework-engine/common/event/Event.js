import { NewUUID } from "./../../../engine/common/utility/Functions.js";

class Event {
	constructor(name, ...payload) {
		this.Name = name;
		this.Payload = payload;

		this.UUID = NewUUID();
		this.Timestamp = Date.now();

		Event.FuzzyKnights.Common.Event.EventManager.Invoke(name, ...payload);
	}
}

export { Event };