import { NewUUID } from "./../utility/Functions.js";

class Message {
	constructor(type, payload, isServerOrigin = false) {
		this.HandlerType = type;
		this.MessageType = this.constructor.name;
		this.Payload = payload;
		this.UUID = NewUUID();
		this.Timestamp = Date.now();

		this.IsServerOrigion = isServerOrigin;
	}

	Send() {
		Message.FuzzyKnights.Common.Message.MessageManager.Send(this);
	}
}

export { Message };