class Event {
	constructor(...payload) {
		this.Payload = payload;

		this.Timestamp = Date.now();
	}

	Invoke(message) {
		(new message(...this.Payload, Event.FuzzyKnights.IsServer)).Send();
	}
}

export { Event };