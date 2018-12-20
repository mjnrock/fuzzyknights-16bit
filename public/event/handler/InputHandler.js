class InputHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onInputKeyboard(msg) {
		console.log(...arguments);
	}

	onInputPlayerKeyState(msg, state) {
		// console.log(...arguments);

		//TODO	Add Velocities here
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.LEFT)) {
			console.log("MOVE - LEFT");
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.RIGHT)) {
			console.log("MOVE - RIGHT");
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.UP)) {
			console.log("MOVE - UP");
		}
		if(this.FuzzyKnights.Utility.Bitwise.Has(state, this.FuzzyKnights.Enum.Bitwise.PlayerKeyState.DOWN)) {
			console.log("MOVE - DOWN");
		}
	}

	ProcessMessage(msg) {
		let payload = Object.values(msg.Payload);
		if(msg.MessageType === "InputPlayerKeyStateMessage") {
			this.onInputPlayerKeyState(msg, ...payload);
		} else if(msg.MessageType === "InputKeyboardMessage") {
			this.onInputKeyboard(msg, ...payload);
		}
	}
	ReceiveMessage(msg, time = null) {
		this.ProcessMessage(msg);

		if(this.FuzzyKnights.IsServer) {
			console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		} else {
			// console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
			console.log(`[MESSAGE RECEIVED - InputHander]: ${msg.MessageType}`);
		}
	}
}

export { InputHandler };