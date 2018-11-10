import EnumHandlerType from "../enum/HandlerType.js";

import { Message } from "./Message.js";

class MessageManager {
	constructor(fk, msgs) {
		this.FuzzyKnights = fk;
		this.Messages = msgs || [];
	}

	Size() {
		return this.Messages.length;
	}
	GetMessages() {
		return this.Messages;
	}
	SetMessages(msgs) {
		this.Messages = msgs;

		return this;
	}

	//! Override function for Message.Send()
	Send(msg) {
		this.Receive(msg);
	}

	Receive(msg) {
		if(msg) {
			if((msg["HandlerType"] !== null && msg["HandlerType"] !== void 0) || msg instanceof Message) {
				this.Enqueue(msg);

				return msg;
			}
		}

		return false;
	}

	Enqueue(msg) {
		this.Messages.push(msg);

		return this;
	}
	Dequeue() {
		if(this.Messages.length > 0) {
			return this.Messages.splice(0, 1)[0];
		}

		return false;
	}

	Dispatch(msg, time = null) {
		let handler;

		if(msg.HandlerType === EnumHandlerType.PLAYER) {
			handler = this.FuzzyKnights.Common.Event.Handler.PlayerHandler;
		} else if(msg.HandlerType === EnumHandlerType.INPUT) {
			handler = this.FuzzyKnights.Common.Event.Handler.InputHandler;
		} else if(msg.HandlerType === EnumHandlerType.ENTITY) {
			handler = this.FuzzyKnights.Common.Event.Handler.EntityHandler;
		}

		if(handler) {
			handler.ReceiveMessage(msg, time);

			return true;
		}

		return false;
	}

	Tick(time) {
		let start = Date.now(),
			timeout = 2000;

		while(this.Messages.length > 0 || (Date.now() - start >= timeout)) {
			this.Dispatch(this.Dequeue(), time);
		}
	}
}

export default MessageManager;